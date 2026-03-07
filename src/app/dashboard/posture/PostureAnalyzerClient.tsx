"use client";

import React, { useEffect, useRef, useState } from 'react';
declare global {
  interface Window {
    tf: any;
    poseDetection: any;
  }
}


export default function PostureAnalyzerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detector, setDetector] = useState<any | null>(null);
  const [isCameraLive, setIsCameraLive] = useState(false);
  const poseDetectionRef = useRef<any | null>(null);
  const [postureScore, setPostureScore] = useState(100);
  const [issues, setIssues] = useState<any[]>([]);
  const requestRef = useRef<number | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const loadScript = (src: string) => new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve(true);
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });

    const initModel = async () => {
      try {
        if (!window.tf || !window.poseDetection) {
            await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core');
            await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter');
            await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl');
            await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection');
        }
        
        await window.tf.ready();
        const pd = window.poseDetection;
        poseDetectionRef.current = pd;
        const detectorConfig = { modelType: pd.movenet.modelType.SINGLEPOSE_LIGHTNING };
        const newDetector = await pd.createDetector(pd.SupportedModels.MoveNet, detectorConfig);
        setDetector(newDetector);
      } catch (err) {
        console.error("Failed to load TFJS model", err);
      }
    };
    initModel();
    
    // Cleanup on unmount
    return () => {
      stopCamera();
    }
  }, []);

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setIsCameraLive(true);
            setImageSrc(null); // Clear any uploaded image
            setPostureScore(100); // Reset score
            setIssues([]);
          };
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    } else {
        alert("Camera API is not supported in this browser.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraLive(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    
    // clear canvas
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (isCameraLive) stopCamera();
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setPostureScore(100);
        setIssues([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageLoad = async () => {
    if (detector && imageRef.current && canvasRef.current) {
        const image = imageRef.current;
        const canvas = canvasRef.current;
        
        try {
            const poses = await detector.estimatePoses(image);
            
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            
            if (poses && poses.length > 0) {
                drawSkeleton(poses[0]);
                analyzePosture(poses[0]);
            } else {
                const ctx = canvas.getContext('2d');
                ctx?.clearRect(0, 0, canvas.width, canvas.height);
            }
        } catch (e) {
            console.error("Pose Detection Error on Image: ", e);
        }
    }
  };

  const detectPose = async () => {
    if (detector && videoRef.current && canvasRef.current && isCameraLive && videoRef.current.readyState === 4) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      try {
          const poses = await detector.estimatePoses(video);
          
          // Match canvas internal resolution to video source resolution
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          if (poses && poses.length > 0) {
              drawSkeleton(poses[0]);
              analyzePosture(poses[0]);
          }
      } catch (e) {
          console.error("Pose Detection Error: ", e);
      }
    }
    if (isCameraLive) {
        requestRef.current = requestAnimationFrame(detectPose);
    }
  };

  useEffect(() => {
    if (isCameraLive) {
      requestRef.current = requestAnimationFrame(detectPose);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isCameraLive, detector]);

  const drawSkeleton = (pose: any) => {
    const ctx = canvasRef.current?.getContext('2d');
    const pd = poseDetectionRef.current;
    if (!ctx || !pose.keypoints || !pd) return;
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw Keypoints
    pose.keypoints.forEach((keypoint: any) => {
      if (keypoint.score && keypoint.score > 0.3) {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#38ff14'; // Primary color
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw lines
    const adjacentPairs = pd.util.getAdjacentPairs(pd.SupportedModels.MoveNet);
    adjacentPairs.forEach((pair: any) => {
        const i = pair[0];
        const j = pair[1];
        const kp1 = pose.keypoints[i];
        const kp2 = pose.keypoints[j];
        
        if (kp1 && kp1.score && kp1.score > 0.3 && kp2 && kp2.score && kp2.score > 0.3) {
            ctx.beginPath();
            ctx.moveTo(kp1.x, kp1.y);
            ctx.lineTo(kp2.x, kp2.y);
            ctx.strokeStyle = 'rgba(56, 255, 20, 0.8)'; // Primary glowing line
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    });
  };

  const analyzePosture = (pose: any) => {
    if (!pose.keypoints) return;
    
    let currentScore = 100;
    const currentIssues = [];
    
    const leftShoulder = pose.keypoints.find((k: any) => k.name === 'left_shoulder');
    const rightShoulder = pose.keypoints.find((k: any) => k.name === 'right_shoulder');
    const leftEar = pose.keypoints.find((k: any) => k.name === 'left_ear');
    const leftHip = pose.keypoints.find((k: any) => k.name === 'left_hip');
    
    // Check shoulder tilt
    if (leftShoulder?.score && leftShoulder.score > 0.3 && rightShoulder?.score && rightShoulder.score > 0.3) {
      const tilt = Math.abs(leftShoulder.y - rightShoulder.y);
      if (tilt > 30) {
        currentScore -= 15;
        currentIssues.push({
            level: 'High',
            title: 'Significant Shoulder Tilt',
            desc: `Uneven shoulders detected. Try to square your shoulders.`
        });
      } else if (tilt > 15) {
          currentScore -= 5;
          currentIssues.push({
            level: 'Medium',
            title: 'Slight Shoulder Tilt',
            desc: `Keep your shoulders level and relaxed.`
        });
      }
    }
    
    // Simple Forward neck check (comparing ears to hips vertically)
    if (leftEar?.score && leftEar.score > 0.3 && leftHip?.score && leftHip.score > 0.3) {
         const distance = Math.abs(leftEar.x - leftHip.x);
         if (distance > 60) {
             currentScore -= 10;
             currentIssues.push({
                level: 'Medium',
                title: 'Forward Neck/Leaning',
                desc: 'Keep your chest up and align your head with your torso.'
            });
         }
    }

    if (currentIssues.length === 0) {
        currentIssues.push({
            level: 'Low',
            title: 'Good Alignment',
            desc: 'Your posture looks great. Keep bracing your core.'
        })
    }

    setPostureScore(Math.max(0, currentScore));
    setIssues(currentIssues);
  };

  // Render dynamic issue colors
  const getIssueStyle = (level: string) => {
    if (level === 'High') return { bg: 'bg-red-500/10 border-red-500/30 text-red-400', icon: 'error', iconColor: 'bg-red-500/20 text-red-500 border-red-500/30' };
    if (level === 'Medium') return { bg: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400', icon: 'warning', iconColor: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' };
    return { bg: 'bg-[#32e612]/10 border-[#32e612]/30 text-[#32e612]', icon: 'check_circle', iconColor: 'bg-[#32e612]/20 text-[#32e612] border-[#32e612]/30' };
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
      
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight flex items-center gap-3">
          AI Posture Analyzer <span className="text-primary text-3xl drop-shadow-[0_0_10px_rgba(56,255,20,0.5)]">📸</span>
        </h1>
        <p className="text-slate-400 text-base">Upload your workout photo or use live camera for real-time AI posture correction</p>
      </header>
      
      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* Left Column (55%) */}
        <div className="xl:w-[55%] flex flex-col gap-6">
          
          {/* Image Analysis Area */}
          <div className="glass-panel backdrop-blur-md border border-surface-glass-border rounded-xl p-4 flex flex-col gap-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
            
            <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-lg border-2 border-dashed border-primary/50 overflow-hidden bg-black/50 flex items-center justify-center group shadow-[inset_0_0_20px_rgba(56,255,20,0.1)]">
              
              {!isCameraLive && !imageSrc ? (
                 <>
                    {/* Placeholder Overlay Image */}
                    <div className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-luminosity bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800')]"></div>
                    
                    {/* Fake AI Skeleton Overlay (Placeholder) */}
                    <svg className="absolute inset-0 w-full h-full text-primary opacity-80 drop-shadow-[0_0_5px_rgba(56,255,20,0.8)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                        {/* Lines */}
                        <line stroke="currentColor" strokeWidth="0.5" x1="50" x2="50" y1="20" y2="40"></line>
                        <line stroke="currentColor" strokeWidth="0.5" x1="50" x2="40" y1="40" y2="60"></line>
                        <line stroke="currentColor" strokeWidth="0.5" x1="50" x2="60" y1="40" y2="60"></line>
                        <line stroke="currentColor" strokeWidth="0.5" x1="40" x2="45" y1="60" y2="85"></line>
                        <line stroke="currentColor" strokeWidth="0.5" x1="60" x2="55" y1="60" y2="85"></line>
                        {/* Joints */}
                        <circle cx="50" cy="20" fill="currentColor" r="1.5"></circle>
                        <circle cx="50" cy="40" fill="currentColor" r="1.5"></circle>
                        <circle cx="40" cy="60" fill="currentColor" r="1.5"></circle>
                        <circle cx="60" cy="60" fill="currentColor" r="1.5"></circle>
                        <circle cx="45" cy="85" fill="currentColor" r="1.5"></circle>
                        <circle cx="55" cy="85" fill="currentColor" r="1.5"></circle>
                    </svg>

                    {/* Hover state for upload/start */}
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm" onClick={() => fileInputRef.current?.click()}>
                        <span className="material-symbols-outlined text-primary text-4xl mb-2 drop-shadow-[0_0_10px_rgba(56,255,20,0.8)]">upload_file</span>
                        <span className="text-white font-medium">Click to Upload Photo</span>
                    </div>
                 </>
              ) : isCameraLive ? (
                  <>
                     {/* Live Video Feed */}
                     <video 
                        ref={videoRef} 
                        className="absolute inset-0 w-full h-full object-cover transform -scale-x-100" 
                        autoPlay 
                        playsInline 
                        muted 
                     />
                     {/* Live Canvas Overlay for Skeleton */}
                     <canvas 
                        ref={canvasRef} 
                        className="absolute inset-0 w-full h-full object-cover transform -scale-x-100 z-10"
                     />
                     
                     <div className="absolute top-4 right-4 z-20">
                         <button onClick={stopCamera} className="bg-red-500/80 hover:bg-red-500 text-white rounded-md px-3 py-1 flex items-center gap-1 text-xs font-bold transition-colors">
                             <span className="material-symbols-outlined text-[14px]">stop_circle</span> Stop Analysis
                         </button>
                     </div>
                  </>
              ) : (
                  <>
                     {/* Static Image Feed */}
                     <img 
                        ref={imageRef} 
                        src={imageSrc as string}
                        alt="Uploaded for posture analysis"
                        className="absolute inset-0 w-full h-full object-contain" 
                        onLoad={handleImageLoad}
                     />
                     {/* Canvas Overlay for Static Image Skeleton */}
                     <canvas 
                        ref={canvasRef} 
                        className="absolute inset-0 w-full h-full object-contain z-10"
                     />
                     <div className="absolute top-4 right-4 z-20">
                         <button onClick={() => { setImageSrc(null); const ctx = canvasRef.current?.getContext('2d'); ctx?.clearRect(0,0,ctx.canvas.width, ctx.canvas.height); setPostureScore(100); setIssues([]); }} className="bg-slate-800/80 hover:bg-slate-700 text-white rounded-md px-3 py-1 flex items-center gap-1 text-xs font-bold transition-colors border border-slate-600">
                             <span className="material-symbols-outlined text-[14px]">close</span> Clear Photo
                         </button>
                     </div>
                  </>
              )}
            </div>

            {/* Mode Toggles */}
            <div className={`flex bg-background-dark/80 p-1 rounded-lg border border-surface-glass-border ${!detector ? 'opacity-50 pointer-events-none' : ''}`}>
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
              <button 
                  onClick={() => fileInputRef.current?.click()} 
                  className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${imageSrc && !isCameraLive ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(56,255,20,0.1)]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                  Upload Photo
              </button>
              <button 
                  onClick={isCameraLive ? stopCamera : startCamera} 
                  className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${isCameraLive ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(56,255,20,0.1)]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                  {isCameraLive ? '🔴 Live Camera Active' : 'Live Camera'}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 font-medium">{!detector ? 'Loading AI Model...' : isCameraLive ? 'Analyzing Position in Real-Time...' : imageSrc ? 'Image Analyzed' : 'AI Ready'}</span>
                <span className="text-primary font-bold drop-shadow-[0_0_5px_rgba(56,255,20,0.5)]">{detector ? '100%' : 'Loading'}</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div className={`h-full bg-primary rounded-full shadow-[0_0_10px_rgba(57,255,20,0.8)] ${!detector ? 'w-1/2 animate-pulse' : 'w-full'}`}></div>
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Right Column (45%) */}
        <div className="xl:w-[45%] flex flex-col gap-6">
          
          {/* Score Card */}
          <div className="glass-panel backdrop-blur-md border border-surface-glass-border rounded-xl p-6 flex flex-col items-center text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full transform -rotate-90 transition-all duration-500" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="none" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="8"></circle>
                <circle 
                    className={`${postureScore > 80 ? 'text-[#32e612]' : postureScore > 60 ? 'text-yellow-400' : 'text-red-500'} drop-shadow-[0_0_8px_currentColor] transition-all duration-300`} 
                    cx="50" cy="50" fill="none" r="45" stroke="currentColor" 
                    strokeDasharray="283" 
                    strokeDashoffset={283 - (283 * postureScore) / 100} 
                    strokeLinecap="round" strokeWidth="8"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-black text-white">{isCameraLive || imageSrc ? Math.round(postureScore) : '--'}</span>
                <span className="text-xs text-slate-400 font-medium">/ 100</span>
              </div>
            </div>
            <h2 className="text-lg font-bold text-white mb-1">{isCameraLive ? 'Live Posture Score' : imageSrc ? 'Static Posture Score' : 'Posture Score'}</h2>
            <p className={`${postureScore > 80 ? 'text-[#32e612] bg-[#32e612]/10 border-[#32e612]/20' : postureScore > 60 ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'} text-sm font-bold px-3 py-1 rounded-full border transition-colors`}>
                {isCameraLive || imageSrc ? (postureScore > 80 ? 'Excellent Alignment' : postureScore > 60 ? 'Needs Improvement' : 'High Risk Position') : 'Start Camera or Upload'}
            </p>
          </div>

          {/* Issues Detected */}
          <div className="flex flex-col gap-3 min-h-[250px]">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Joint Analysis</h3>
            
            {!isCameraLive && !imageSrc && (
                <div className="flex items-center justify-center p-8 bg-slate-900/50 rounded-xl border border-slate-800 text-slate-500 text-sm">
                    Activate camera or upload photo to see issues.
                </div>
            )}

            {(isCameraLive || imageSrc) && issues.map((issue, idx) => {
               const style = getIssueStyle(issue.level);
               return (
                   <div key={idx} className={`${style.bg} border rounded-xl p-4 flex flex-col sm:flex-row items-start gap-3 backdrop-blur-sm shadow-md animate-in fade-in slide-in-from-bottom-2`}>
                     <div className={`mt-0.5 rounded-full p-1 border flex-shrink-0 ${style.iconColor}`}>
                       <span className="material-symbols-outlined text-[16px]">{style.icon}</span>
                     </div>
                     <div>
                       <h4 className="font-bold text-sm mb-1">{issue.level}: {issue.title}</h4>
                       <p className="text-slate-300 text-xs leading-relaxed">{issue.desc}</p>
                     </div>
                   </div>
               )
            })}
          </div>

          {/* Correction Tips */}
          <div className="glass-panel backdrop-blur-md border border-surface-glass-border rounded-xl p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] mt-2">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">General Correction Tips</h3>
            <ol className="flex flex-col gap-4 text-sm text-slate-300">
              <li className="flex gap-4 items-start bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs border border-primary/40 shadow-[0_0_8px_rgba(56,255,20,0.2)]">1</span>
                <span className="leading-relaxed">Engage your core (brace) before beginning any movement to stabilize the spine.</span>
              </li>
              <li className="flex gap-4 items-start bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs border border-primary/40 shadow-[0_0_8px_rgba(56,255,20,0.2)]">2</span>
                <span className="leading-relaxed">Keep your chest up and shoulders pulled back and down.</span>
              </li>
            </ol>
            <button className="w-full mt-6 py-3.5 bg-primary text-black rounded-xl font-bold hover:bg-[#32e612] transition-colors shadow-[0_0_20px_rgba(57,255,20,0.4)] flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">analytics</span> Generating Full Report
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
