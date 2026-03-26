import { Slide } from './components/Slide';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Network, ShieldAlert, Workflow, Terminal, Lock, Globe, ServerCrash } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

// Custom Stinson Animation Variants
const stinsonFadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

const stinsonStagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
};

const CardVariant: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

// 1. THE DECRYPTION COMPONENT
const DecryptText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const [displayText, setDisplayText] = useState('');
    // Authentic hacker payload aesthetic: uppercase, digits, and tight symbols
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#';

    useEffect(() => {
        let isMounted = true;
        let iteration = 0;
        let interval: ReturnType<typeof setInterval>;

        const startDecryption = () => {
            interval = setInterval(() => {
                if (!isMounted) return;

                setDisplayText(text.split('').map((letter, index) => {
                    if (index < iteration) {
                        return letter;
                    }
                    // Keep spaces intact so the paragraph shape isn't a solid block of noise
                    if (letter === ' ') {
                        return letter;
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join(''));

                if (iteration >= text.length) {
                    clearInterval(interval);
                }
                // Lightning fast iteration to hit the ~1.2s target
                iteration += 5;
            }, 15); // Faster tick interval for smoother motion (15ms vs 30ms)
        };

        const timeout = setTimeout(startDecryption, delay);
        return () => {
            isMounted = false;
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [text, delay]);

    return <span style={{ fontFamily: 'var(--font-mono)' }}>{displayText}</span>;
};

// 2. THE CINEMATIC HOLD COMPONENT
const CinematicHold = ({ startFrame, videoTransition, endFrame }: { startFrame: string, videoTransition: string, endFrame: string }) => {
    const [phase, setPhase] = useState<'START' | 'TRANSITION' | 'END'>('START');
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let isMounted = true;
        document.body.setAttribute('data-cinematic-phase', phase);

        if (phase === 'START') {
            const timer = setTimeout(() => {
                if (isMounted) {
                    setPhase('TRANSITION');
                    if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play().catch(e => console.error(e));
                    }
                }
            }, 50);
            return () => {
                isMounted = false;
                clearTimeout(timer);
                document.body.removeAttribute('data-cinematic-phase');
            };
        }

        return () => {
            isMounted = false;
            document.body.removeAttribute('data-cinematic-phase');
        };
    }, [phase]);

    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
            {/* Phase 1: The Anchor Holding Slide */}
            <motion.div 
                initial={{ opacity: 1 }} 
                animate={{ opacity: phase === 'START' ? 1 : 0 }} 
                transition={{ duration: 0.3 }}
                style={{ position: 'absolute', inset: 0, backgroundImage: `url(${startFrame})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -2 }} 
            />

            {/* Phase 2: The Mechanism Video */}
            <video
                ref={videoRef}
                muted
                playsInline
                onEnded={() => setPhase('END')}
                style={{ 
                    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                    opacity: phase !== 'START' ? 1 : 0, 
                    zIndex: -1,
                    transition: 'opacity 0.2s'
                }}
            >
                <source src={videoTransition} type="video/mp4" />
            </video>

            {/* Phase 3: The New Bliss Holding Slide */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'END' ? 1 : 0 }}
                transition={{ duration: 0.5 }} 
                style={{ position: 'absolute', inset: 0, backgroundImage: `url(${endFrame})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 1 }}
            />

            {/* Persistent Overlay for text readability */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)', zIndex: 2 }}></div>
        </div>
    );
};



// 3. THE INTERACTIVE TIMER COMPONENT
const InteractiveTimer = ({ minutes }: { minutes: number }) => {
    const [timeLeft, setTimeLeft] = useState(minutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [phase, setPhase] = useState<'START' | 'END'>('START');

    useEffect(() => {
        document.body.setAttribute('data-cinematic-phase', phase);

        const handleAdvance = () => {
            if (phase === 'START') {
                setIsRunning(true);
                setPhase('END');
            }
        };

        window.addEventListener('advance-cinematic', handleAdvance);
        return () => {
            window.removeEventListener('advance-cinematic', handleAdvance);
            document.body.removeAttribute('data-cinematic-phase');
        };
    }, [phase]);

    useEffect(() => {
        if (!isRunning) return;
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isRunning]);

    const displayMins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const displaySecs = (timeLeft % 60).toString().padStart(2, '0');

    return (
        <h1 style={{ fontSize: '15rem', color: timeLeft <= 30 ? 'var(--color-accent-red)' : 'var(--color-accent-cyan)', fontWeight: 900, fontFamily: 'var(--font-mono)', lineHeight: 1, transition: 'color 0.5s' }}>
            {displayMins}:{displaySecs}
        </h1>
    );
};

export const slides = [

<Slide key="0">
        <div style={{ textAlign: 'center' }}>
            <motion.h1 initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 2, ease: "easeOut" }} style={{ fontSize: '7rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--color-text-primary)' }}>
                THE TRANSLATION LAYER
            </motion.h1>
            <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: '100px' }} transition={{ delay: 1, duration: 1 }} style={{ height: '2px', background: 'var(--color-accent-cyan)', margin: '3rem auto' }} />
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', fontWeight: 400, letterSpacing: '0.2em' }}>
                [ HUMAN PROTOCOL OVERRIDE ]
            </motion.h2>
        </div>
        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', opacity: 0.5, fontSize: '0.8rem' }}>
            [sys.auth] process_id: 8491 :: wait_state
        </div>
    </Slide>,
<Slide key="1">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/cinematic_elevator_1772744772877.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.7, zIndex: -1 }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, var(--color-bg) 100%)', zIndex: -1 }}></div>
        <motion.h2 variants={stinsonFadeUp} initial="hidden" whileInView="visible" style={{ position: 'absolute', bottom: '10%', left: '10%', fontSize: '5rem', fontWeight: 600, color: '#fff', maxWidth: '1000px', textShadow: '0 10px 40px rgba(0,0,0,0.9)' }}>
            Tuesday Morning. 8:00 AM.<br />The Elevator Doors Close.
        </motion.h2>
    </Slide>,
<Slide key="2">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/glowing_audit_document_1772744785839.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4, zIndex: -1 }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 100%)', zIndex: -1 }}></div>
        <div style={{ textAlign: 'left', maxWidth: '1200px', padding: '0 5%' }}>
            <motion.h1 variants={stinsonFadeUp} initial="hidden" whileInView="visible" style={{ fontSize: '6rem', fontWeight: 700, color: '#fff' }}>
                "What is a <br /><span className="stinson-glow-text" style={{ color: 'var(--color-accent-red)' }}>Server-Side Request Forgery</span>... <br />and why does it cost €100,000 to fix?"
            </motion.h1>
        </div>
    </Slide>,
<Slide key="act1_panic">
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(255,0,0,0.05) 0%, var(--color-bg) 100%)', zIndex: -1 }}></div>
    <div style={{ textAlign: 'center', width: '100%' }}>
        <h3 className="terminal-red" style={{ fontSize: '1.5rem', letterSpacing: '0.3em', marginBottom: '4rem' }}>[ SYSTEM OVERLOAD: FIGHT OR FLIGHT ]</h3>
        <motion.div initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.5 }} style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)', lineHeight: 1.8 }}>
            backend_architecture<br/>
            metadata_instance_endpoints<br/>
            <span style={{color: 'var(--color-accent-red)', opacity: 0.8, fontSize: '3rem'}}>&gt; IAM ROLE MISCONFIGURATION</span><br/>
            packet_routing_tables<br/>
            internal_network_boundaries<br/>
            CVSS_SCORE_9.8_CRITICAL
        </motion.div>
        <motion.h1 initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 1, duration: 0.5 }} className="stinson-glow-text" style={{ fontSize: '5rem', color: 'var(--color-accent-red)', fontWeight: 900, marginTop: '4rem', letterSpacing: '0.1em' }}>
            FACTUALLY CORRECT.<br/>FUNCTIONALLY USELESS.
        </motion.h1>
    </div>
</Slide>,
<Slide key="4">
        <div className="glass-panel" style={{ padding: '6rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'left', borderLeft: '4px solid var(--color-accent-cyan)' }}>
            <Terminal size={40} color="var(--color-accent-cyan)" style={{ marginBottom: '2rem' }} />
            <h2 style={{ fontSize: '3rem', color: '#fff', fontWeight: 300, lineHeight: 1.4, marginBottom: '3rem' }}>
                <DecryptText text="It is like a thief calling a hotel's front desk from an internal hallway phone and ordering the master keys to be left at the back door. Because the caller ID shows the request coming from inside the building, the staff implicitly trusts it and hands over the keys without verifying the caller's identity." delay={500} />
            </h2>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.2 }} className="terminal-red" style={{ fontSize: '1.2rem', letterSpacing: '0.1em' }}>
                EXECUTION TIME: 1.2s // SYSTEM: ORACLE_AI
            </motion.div>
        </div>
    </Slide>,
<Slide key="act1_oracle">
    <div style={{ textAlign: 'center', width: '100%', maxWidth: '1400px' }}>
        <h3 className="terminal-red" style={{ fontSize: '1.5rem', letterSpacing: '0.4em', marginBottom: '4rem', opacity: 0.6 }}>[ OBSCURITY = JOB SECURITY ]</h3>
        <motion.h1 initial={{ scale: 0.95, opacity: 0, filter: 'blur(10px)' }} whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 1.5, ease: "easeOut" }} style={{ fontSize: '6rem', fontWeight: 300, color: 'var(--color-text-secondary)', lineHeight: 1.2 }}>
            That monopoly is dead.
        </motion.h1>
        <motion.h1 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1.5 }} className="stinson-glow-text" style={{ fontSize: '8.5rem', fontWeight: 900, color: 'var(--color-accent-cyan)', marginTop: '2rem', letterSpacing: '-0.03em', textShadow: '0 0 30px rgba(0, 255, 255, 0.4)' }}>
            THE MACHINE IS THE ORACLE NOW.
        </motion.h1>
    </div>
</Slide>,
<Slide key="1b">
        <CinematicHold
            startFrame="/assets/ACT_1_start.png"
            videoTransition="/assets/ACT_1_transition.mp4"
            endFrame="/assets/ACT_1_end.png"
        />
        <motion.h2 variants={stinsonFadeUp} initial="hidden" whileInView="visible" style={{ position: 'absolute', bottom: '10%', left: '10%', fontSize: '4.5rem', fontWeight: 600, color: '#fff', maxWidth: '1200px', textShadow: '0 10px 40px rgba(0,0,0,0.9)', zIndex: 10 }}>
            "When the CEO of Delta Airlines was losing 50 million dollars a day..."
        </motion.h2>
    </Slide>,
<Slide key="5">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0,100,255,0.15) 0%, var(--color-bg) 100%)', zIndex: -1 }}></div>
        <div style={{ textAlign: 'center', maxWidth: '1200px' }}>
            <h3 className="terminal-cyan" style={{ fontSize: '1.5rem', letterSpacing: '0.3em', marginBottom: '4rem' }}>
                [ HISTORICAL OVERRIDE: 2024-2026 ]
            </h3>
            <motion.h1 variants={stinsonFadeUp} initial="hidden" whileInView="visible" style={{ fontSize: '6.5rem', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '3rem', textShadow: '0 0 30px rgba(0,150,255,0.3)' }}>
                The Board doesn't care about a out-of-bounds read in a <span style={{ color: 'var(--color-accent-cyan)' }}>.sys</span> file.
            </motion.h1>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} style={{ fontSize: '4rem', fontWeight: 300, color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                "They care that the planes are grounded."
            </motion.h2>
        </div>
    </Slide>,
<Slide key="act1_nokia">
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0,255,100,0.1) 0%, var(--color-bg) 100%)', zIndex: -1 }}></div>
    <div style={{ textAlign: 'center', maxWidth: '1200px' }}>
        <h3 className="terminal-text" style={{ fontSize: '1.5rem', letterSpacing: '0.3em', marginBottom: '4rem', opacity: 0.6 }}>
            [ HISTORICAL OVERRIDE: NOKIA ]
        </h3>
        <motion.h1 variants={stinsonFadeUp} initial="hidden" whileInView="visible" style={{ fontSize: '5.5rem', fontWeight: 600, color: '#fff', lineHeight: 1.2, marginBottom: '3rem' }}>
            When the boardroom loses its connection to the engineering floor...
        </motion.h1>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="stinson-glow-text" style={{ fontSize: '6rem', fontWeight: 800, color: 'var(--color-accent-amber)' }}>
            THE EMPIRE FRACTURES.
        </motion.h2>
    </div>
</Slide>,
<Slide key="act2_autopsy">
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/dark_war_room_1772225356705.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, zIndex: -1 }}></div>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, var(--color-bg) 100%)', zIndex: -1 }}></div>
    <div className="glass-panel" style={{ padding: '6rem', maxWidth: '1000px', textAlign: 'center' }}>
        <Terminal size={60} color="var(--color-text-secondary)" style={{ margin: '0 auto 2rem auto', opacity: 0.5 }} />
        <h3 className="terminal-text" style={{ fontSize: '1.5rem', letterSpacing: '0.3em', marginBottom: '3rem', opacity: 0.7 }}>[ INCIDENT REPORT: THE VISMA BOARDROOM ]</h3>
        <motion.h1 variants={stinsonFadeUp} initial="hidden" whileInView="visible" style={{ fontSize: '5rem', color: '#fff', fontWeight: 700, fontStyle: 'italic' }}>
            A public autopsy of a failure.
        </motion.h1>
    </div>
</Slide>,
<Slide key="7">
        <video autoPlay muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, zIndex: -1 }}>
            <source src="/assets/smooth_interpolate.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0,0,0,0.5) 0%, var(--color-bg) 100%)', zIndex: -1 }}></div>

        <div className="stinson-grid" style={{ width: '100%', maxWidth: '1400px', alignItems: 'stretch' }}>
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="glass-panel" style={{ gridColumn: 'span 6', padding: '4rem', borderTop: '4px solid var(--color-accent-cyan)' }}>
                <h3 className="terminal-cyan" style={{ fontSize: '1.2rem', letterSpacing: '0.1em', marginBottom: '2rem' }}>LOGICAL PROCESSOR</h3>
                <h1 style={{ fontSize: '3.5rem', color: '#fff', fontWeight: 700 }}>PREFRONTAL CORTEX</h1>
                <div style={{ marginTop: '3rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', fontSize: '1.4rem', lineHeight: 2 }}>
                    {'>'} MAXIMUM TRANSMISSION UNIT (MTU)<br />
                    {'>'} SPEC: 1500 BYTES<br />
                    {'>'} STATUS: PEGGED AT 99%
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="glass-panel" style={{ gridColumn: 'span 6', padding: '4rem', background: 'rgba(255,0,0,0.05)', borderTop: '4px solid var(--color-accent-red)' }}>
                <h3 className="terminal-red" style={{ fontSize: '1.2rem', letterSpacing: '0.1em', marginBottom: '2rem' }}>EMOTIONAL PROCESSOR</h3>
                <h1 style={{ fontSize: '3.5rem', color: 'var(--color-accent-red)', fontWeight: 700 }}>THE AMYGDALA</h1>
                <div style={{ marginTop: '3rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', fontSize: '1.4rem', lineHeight: 2 }}>
                    {'>'} CORTISOL: FLOODED<br />
                    {'>'} FIGHT_OR_FLIGHT() = TRUE<br />
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 1 }} style={{ color: 'var(--color-accent-red)' }}>
                        {'>'} AMYGDALA HIJACK: ACTIVE
                    </motion.div>
                </div>
            </motion.div>

            <div style={{ gridColumn: 'span 12', textAlign: 'center', marginTop: '4rem' }}>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1 }} style={{ fontSize: '3rem', color: '#fff', fontWeight: 300, fontStyle: 'italic' }}>
                    "You are sending a 9000-byte jumbo frame<br />to a biological system that can only handle 1500 bytes."
                </motion.h2>
            </div>
        </div>
    </Slide>,
<Slide key="3">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/packet_dropped_1772779411806.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5, zIndex: -1 }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0,0,0,0.6) 0%, var(--color-bg) 100%)', zIndex: -1 }}></div>
        <div style={{ textAlign: 'center', width: '100%' }}>
            <motion.h1 className="glitch-text" data-text="PACKET DROPPED." initial={{ scale: 0.9, filter: 'blur(5px)' }} whileInView={{ scale: 1, filter: 'blur(0px)' }} transition={{ duration: 0.5 }} style={{ fontSize: '10rem', fontWeight: 900, color: 'var(--color-text-primary)', letterSpacing: '-0.05em' }}>
                PACKET DROPPED.
            </motion.h1>
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} style={{ marginTop: '2rem', fontSize: '2.5rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}>
                TARGET CPU OVERLOADED.<br/>OUT OF MEMORY.<br/><span style={{fontSize: "1.5rem", marginTop: "2rem", display: "inline-block", color: "var(--color-accent-red)"}}>TRANSLATION: "I AM AN EXPENSIVE NERD SLOWING DOWN THE BUSINESS."</span>
            </motion.h2>
        </div>
    </Slide>,
<Slide key="act2_archetypes">
    <div style={{ width: '100%', maxWidth: '1400px' }}>
        <h1 style={{ fontSize: '4rem', color: '#fff', marginBottom: '6rem', textAlign: 'center', fontWeight: 300 }}>The Biology of Panic</h1>
        <motion.div variants={stinsonStagger} initial="hidden" whileInView="visible" className="stinson-grid">
            <motion.div variants={CardVariant} className="glass-panel" style={{ gridColumn: 'span 4', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderTop: '4px solid var(--color-accent-red)' }}>
                <ShieldAlert size={60} color="var(--color-accent-red)" style={{ marginBottom: '2rem' }} />
                <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '1rem' }}>The Panicker</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.4rem', fontStyle: 'italic' }}>Pulls the plug. Bypasses security protocols entirely.</p>
            </motion.div>
            <motion.div variants={CardVariant} className="glass-panel" style={{ gridColumn: 'span 4', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderTop: '4px solid var(--color-accent-amber)' }}>
                <Globe size={60} color="var(--color-accent-amber)" style={{ marginBottom: '2rem' }} />
                <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '1rem' }}>The Ostrich</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.4rem', fontStyle: 'italic' }}>"Put it in an email." Ignores it until it's front-page news.</p>
            </motion.div>
            <motion.div variants={CardVariant} className="glass-panel" style={{ gridColumn: 'span 4', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderTop: '4px solid var(--color-accent-cyan)' }}>
                <Terminal size={60} color="var(--color-accent-cyan)" style={{ marginBottom: '2rem' }} />
                <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '1rem' }}>The Interrogator</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.4rem', fontStyle: 'italic' }}>Derails the meeting with 100 irrelevant technical questions.</p>
            </motion.div>
        </motion.div>
    </div>
</Slide>,
<Slide key="6">
        <div className="stinson-grid" style={{ alignItems: 'center' }}>
            <div style={{ gridColumn: 'span 12', textAlign: 'center' }}>
                <motion.h2 variants={stinsonFadeUp} initial="hidden" whileInView="visible" style={{ fontSize: '5rem', fontWeight: 500, color: '#fff' }}>
                    We use jargon as a shield.
                </motion.h2>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }} className="stinson-glow-text" style={{ fontSize: '5rem', fontWeight: 800, color: 'var(--color-accent-red)', marginTop: '2rem' }}>
                    Instead, we build a wall.
                </motion.h2>
            </div>
        </div>
    </Slide>,
<Slide key="8">
        <video autoPlay muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: -1 }}>
            <source src="/assets/particles_crystal.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.3))', zIndex: -1 }}></div>
        <div className="glass-panel" style={{ padding: '6rem 8rem', textAlign: 'center' }}>
            <Network size={80} color="var(--color-accent-cyan)" style={{ margin: '0 auto 3rem auto' }} />
            <h1 style={{ fontSize: '5rem', letterSpacing: '0.1em', color: 'var(--color-accent-cyan)', fontWeight: 800 }}>LOSSLESS COMPRESSION</h1>
            <p className="terminal-text" style={{ marginTop: '3rem', fontSize: '1.8rem', opacity: 0.7 }}>HUMAN COMMUNICATION == ENGINEERING PROBLEM</p>
        </div>
    </Slide>,
<Slide key="9">
        <div style={{ width: '100%', maxWidth: '1200px' }}>
            <h1 style={{ fontSize: '4rem', color: '#fff', marginBottom: '4rem', textAlign: 'center', fontWeight: 300 }}>The Target Payload</h1>

            <motion.div variants={stinsonStagger} initial="hidden" whileInView="visible" className="stinson-grid">
                <motion.div variants={CardVariant} className="glass-panel" style={{ gridColumn: 'span 4', padding: '4rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderTop: '4px solid #fff' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                        <span className="terminal-text" style={{ fontSize: '1.5rem' }}>01</span>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '1rem' }}>The Anchor</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.4rem' }}>The Physical Bridge.</p>
                </motion.div>

                <motion.div variants={CardVariant} className="glass-panel" style={{ gridColumn: 'span 4', padding: '4rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderTop: '4px solid var(--color-accent-cyan)' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                        <span className="terminal-cyan terminal-text" style={{ fontSize: '1.5rem' }}>02</span>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--color-accent-cyan)', marginBottom: '1rem' }}>The Mechanism</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.4rem' }}>The Single Executable.</p>
                </motion.div>

                <motion.div variants={CardVariant} className="glass-panel" style={{ gridColumn: 'span 4', padding: '4rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderTop: '4px solid var(--color-accent-red)' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255, 51, 51, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                        <span className="terminal-red terminal-text" style={{ fontSize: '1.5rem' }}>03</span>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--color-accent-red)', marginBottom: '1rem' }}>The Impact</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.4rem' }}>The Business Pain.</p>
                </motion.div>
            </motion.div>
        </div>
    </Slide>,
<Slide key="10">
        <div style={{ textAlign: 'center' }}>
            <h3 className="terminal-cyan" style={{ fontSize: '2rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>[ Case Study 01 ]</h3>
            <motion.h1 initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} style={{ fontSize: '9rem', fontWeight: 900, color: '#fff', marginTop: '2rem', letterSpacing: '-0.03em' }}>
                ZERO TRUST
            </motion.h1>
            <ShieldAlert size={60} color="var(--color-accent-cyan)" style={{ margin: '3rem auto 0 auto', opacity: 0.5 }} />
        </div>
    </Slide>,
<Slide key="11">
        <CinematicHold startFrame="/assets/ACT_3_start.png" videoTransition="/assets/ACT_3_transition.mp4" endFrame="/assets/ACT_3_end.png" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 100%)', zIndex: -1 }}></div>
        <div style={{ position: 'relative', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 5%', zIndex: 10 }}>
            <h3 className="terminal-cyan" style={{ fontSize: '1.5rem', letterSpacing: '0.1em', marginBottom: '4rem' }}>[ LOSSLESS COMPRESSION ]</h3>
            <motion.div variants={stinsonStagger} initial="hidden" whileInView="visible" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '3rem 4rem', display: 'flex', alignItems: 'center', gap: '4rem', borderLeft: '4px solid #fff' }}>
                    <div style={{ width: '200px', flexShrink: 0 }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#fff' }}>ANCHOR</h2>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 300, color: '#fff', lineHeight: 1.3 }}>"A medieval castle vs a modern hotel."</p>
                </motion.div>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '3rem 4rem', display: 'flex', alignItems: 'center', gap: '4rem', borderLeft: '4px solid var(--color-accent-cyan)' }}>
                    <div style={{ width: '200px', flexShrink: 0 }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-accent-cyan)' }}>MECHANISM</h2>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 300, color: '#fff', lineHeight: 1.3 }}>"Your keycard only opens your specific room, for 24 hours."</p>
                </motion.div>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '3rem 4rem', display: 'flex', alignItems: 'center', gap: '4rem', borderLeft: '4px solid var(--color-accent-red)' }}>
                    <div style={{ width: '200px', flexShrink: 0 }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-accent-red)' }}>IMPACT</h2>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 300, color: '#fff', lineHeight: 1.3 }}>"The blast radius is isolated. A compromised laptop cannot burn down the building."</p>
                </motion.div>
            </motion.div>
        </div>
    </Slide>,
    <Slide key="cs2_1">
        <div style={{ textAlign: 'center' }}>
            <h3 className="terminal-cyan" style={{ fontSize: '2rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>[ Case Study 02 ]</h3>
            <motion.h1 initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} style={{ fontSize: '9rem', fontWeight: 900, color: '#fff', marginTop: '2rem', letterSpacing: '-0.03em' }}>
                TECHNICAL DEBT
            </motion.h1>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/tech_debt_monolith_1772779440570.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, zIndex: -1 }}></div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)', zIndex: -1 }}></div>
        </div>
    </Slide>,

    <Slide key="cs2_2">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/tech_debt_monolith_1772779440570.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1, zIndex: -1 }}></div>
        <div style={{ position: 'relative', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 5%', zIndex: 10 }}>
            <h3 className="terminal-cyan" style={{ fontSize: '1.5rem', letterSpacing: '0.1em', marginBottom: '4rem' }}>[ LOSSLESS COMPRESSION ]</h3>
            <motion.div variants={stinsonStagger} initial="hidden" whileInView="visible" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '3rem 4rem', display: 'flex', alignItems: 'center', gap: '4rem', borderLeft: '4px solid #fff' }}>
                    <div style={{ width: '200px', flexShrink: 0 }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#fff' }}>ANCHOR</h2>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 300, color: '#fff', lineHeight: 1.3 }}>"High-interest credit card debt."</p>
                </motion.div>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '3rem 4rem', display: 'flex', alignItems: 'center', gap: '4rem', borderLeft: '4px solid var(--color-accent-cyan)' }}>
                    <div style={{ width: '200px', flexShrink: 0 }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-accent-cyan)' }}>MECHANISM</h2>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 300, color: '#fff', lineHeight: 1.3 }}>"We used a credit card to buy speed today to launch Q2 on time, but now we pay 25% compounding interest."</p>
                </motion.div>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '3rem 4rem', display: 'flex', alignItems: 'center', gap: '4rem', borderLeft: '4px solid var(--color-accent-red)' }}>
                    <div style={{ width: '200px', flexShrink: 0 }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-accent-red)' }}>IMPACT</h2>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 300, color: '#fff', lineHeight: 1.3 }}>"If we don't spend this sprint paying down the principal, next year our entire budget goes to interest. Feature bankruptcy."</p>
                </motion.div>
            </motion.div>
        </div>
    </Slide>,
    <Slide key="cs3_1">
        <div style={{ textAlign: 'center' }}>
            <h3 className="terminal-cyan" style={{ fontSize: '2rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>[ Case Study 03 ]</h3>
            <motion.h1 initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} style={{ fontSize: '9rem', fontWeight: 900, color: '#fff', marginTop: '2rem', letterSpacing: '-0.03em' }}>
                API SECURITY (BOLA)
            </motion.h1>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/false_compromise_1772779454679.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, zIndex: -1 }}></div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)', zIndex: -1 }}></div>
        </div>
    </Slide>,

    <Slide key="cs3_2">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/false_compromise_1772779454679.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1, zIndex: -1 }}></div>
        <div style={{ position: 'relative', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 5%', zIndex: 10 }}>
            <h3 className="terminal-cyan" style={{ fontSize: '1.5rem', letterSpacing: '0.1em', marginBottom: '4rem' }}>[ LOSSLESS COMPRESSION ]</h3>
            <motion.div variants={stinsonStagger} initial="hidden" whileInView="visible" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '3rem 4rem', display: 'flex', alignItems: 'center', gap: '4rem', borderLeft: '4px solid #fff' }}>
                    <div style={{ width: '200px', flexShrink: 0 }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#fff' }}>ANCHOR</h2>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 300, color: '#fff', lineHeight: 1.3 }}>"A broken coat check at a nightclub."</p>
                </motion.div>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '3rem 4rem', display: 'flex', alignItems: 'center', gap: '4rem', borderLeft: '4px solid var(--color-accent-cyan)' }}>
                    <div style={{ width: '200px', flexShrink: 0 }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-accent-cyan)' }}>MECHANISM</h2>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 300, color: '#fff', lineHeight: 1.3 }}>"The guard gives you ticket 42. You come back, say you're 43, and because he doesn't check ID, hands you someone else's coat."</p>
                </motion.div>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '3rem 4rem', display: 'flex', alignItems: 'center', gap: '4rem', borderLeft: '4px solid var(--color-accent-red)' }}>
                    <div style={{ width: '200px', flexShrink: 0 }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-accent-red)' }}>IMPACT</h2>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 300, color: '#fff', lineHeight: 1.3 }}>"An attacker is changing the ID number in their browser URL... grabbing our customer's private billing data. It's an instant GDPR breach."</p>
                </motion.div>
            </motion.div>
        </div>
    </Slide>,
<Slide key="12">
        <div style={{ textAlign: 'center' }}>
            <h3 className="terminal-amber" style={{ fontSize: '2rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>[ Case Study 04 ]</h3>
            <motion.h1 initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} style={{ fontSize: '9rem', fontWeight: 900, color: '#fff', marginTop: '2rem', letterSpacing: '-0.03em' }}>
                SUPPLY CHAIN
            </motion.h1>
            <Workflow size={60} color="var(--color-accent-amber)" style={{ margin: '3rem auto 0 auto', opacity: 0.5 }} />
        </div>
    </Slide>,
<Slide key="13">
        <CinematicHold startFrame="/assets/ACT_4_start.png" videoTransition="/assets/ACT_4_transition.mp4" endFrame="/assets/ACT_4_end.png" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 100%)', zIndex: -1 }}></div>
        <div style={{ position: 'relative', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 5%', zIndex: 10 }}>
            <h3 className="terminal-amber" style={{ fontSize: '1.5rem', letterSpacing: '0.1em', marginBottom: '4rem' }}>[ LOSSLESS COMPRESSION ]</h3>
            <motion.div variants={stinsonStagger} initial="hidden" whileInView="visible" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '3rem 4rem', display: 'flex', alignItems: 'center', gap: '4rem', borderLeft: '4px solid #fff' }}>
                    <div style={{ width: '200px', flexShrink: 0 }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#fff' }}>ANCHOR</h2>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 300, color: '#fff', lineHeight: 1.3 }}>"A poisoner in the water treatment plant."</p>
                </motion.div>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '3rem 4rem', display: 'flex', alignItems: 'center', gap: '4rem', borderLeft: '4px solid var(--color-accent-amber)' }}>
                    <div style={{ width: '200px', flexShrink: 0 }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-accent-amber)' }}>MECHANISM</h2>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 300, color: '#fff', lineHeight: 1.3 }}>"They didn't break into our house. They put poison in the municipal water supply we already trust."</p>
                </motion.div>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '3rem 4rem', display: 'flex', alignItems: 'center', gap: '4rem', borderLeft: '4px solid var(--color-accent-red)' }}>
                    <div style={{ width: '200px', flexShrink: 0 }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-accent-red)' }}>IMPACT</h2>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 300, color: '#fff', lineHeight: 1.3 }}>"Because we blindly trusted the vendor's update, we drank the poison. We need budget to test the water first."</p>
                </motion.div>
            </motion.div>
        </div>
    </Slide>,
<Slide key="14">
        <div style={{ textAlign: 'center' }}>
            <h3 className="terminal-cyan" style={{ fontSize: '2rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>[ Case Study 05 ]</h3>
            <motion.h1 initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} style={{ fontSize: '8rem', fontWeight: 900, color: '#fff', marginTop: '2rem', letterSpacing: '-0.03em' }}>
                QUANTUM CRYPTO
            </motion.h1>
            <Lock size={60} color="var(--color-accent-cyan)" style={{ margin: '3rem auto 0 auto', opacity: 0.5 }} />
        </div>
    </Slide>,
<Slide key="15">
        <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 5%' }}>
            <h3 className="terminal-cyan" style={{ fontSize: '1.5rem', letterSpacing: '0.1em', marginBottom: '4rem' }}>[ Q-DAY: LOSSLESS COMPRESSION ]</h3>
            <motion.div variants={stinsonStagger} initial="hidden" whileInView="visible" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '3rem 4rem', display: 'flex', alignItems: 'center', gap: '4rem', borderLeft: '4px solid #fff' }}>
                    <div style={{ width: '200px', flexShrink: 0 }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#fff' }}>ANCHOR</h2>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 300, color: '#fff', lineHeight: 1.3 }}>"A combination lock vs a master key."</p>
                </motion.div>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '3rem 4rem', display: 'flex', alignItems: 'center', gap: '4rem', borderLeft: '4px solid var(--color-accent-cyan)' }}>
                    <div style={{ width: '200px', flexShrink: 0 }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-accent-cyan)' }}>MECHANISM</h2>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 300, color: '#fff', lineHeight: 1.3 }}>"A normal computer tries combinations one by one. A quantum computer tries all combinations instantly."</p>
                </motion.div>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '3rem 4rem', display: 'flex', alignItems: 'center', gap: '4rem', borderLeft: '4px solid var(--color-accent-red)' }}>
                    <div style={{ width: '200px', flexShrink: 0 }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-accent-red)' }}>IMPACT</h2>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 300, color: '#fff', lineHeight: 1.3 }}>"Adversaries are harvesting our encrypted data today, waiting for the master key tomorrow. We must upgrade the locks now."</p>
                </motion.div>
            </motion.div>
        </div>
    </Slide>,
<Slide key="act4_lab_intro">
    <div style={{ textAlign: 'center', width: '100%' }}>
        <h3 className="terminal-cyan" style={{ fontSize: '2rem', letterSpacing: '0.4em', marginBottom: '4rem' }}>[ THE LIVE HOT SEAT LAB ]</h3>
        <motion.h1 variants={stinsonFadeUp} initial="hidden" whileInView="visible" style={{ fontSize: '6rem', color: '#fff', fontWeight: 800, marginBottom: '4rem' }}>
            TARGET: DDoS ATTACK <br/> BUDGET: CLOUDFLARE
        </motion.h1>
        <motion.div variants={stinsonStagger} initial="hidden" whileInView="visible" style={{ display: 'inline-block', textAlign: 'left', background: 'rgba(255,0,0,0.05)', padding: '4rem', borderLeft: '4px solid var(--color-accent-red)', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-accent-red)', marginBottom: '2rem' }}>FORBIDDEN WORDS:</h2>
            <ul style={{ fontSize: '2.5rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', listStyleType: 'none', padding: 0, margin: 0, lineHeight: 1.8 }}>
                <motion.li variants={CardVariant}>{'>'} SERVER</motion.li>
                <motion.li variants={CardVariant}>{'>'} TRAFFIC</motion.li>
                <motion.li variants={CardVariant}>{'>'} NETWORK</motion.li>
                <motion.li variants={CardVariant}>{'>'} BOTNET</motion.li>
                <motion.li variants={CardVariant}>{'>'} BANDWIDTH</motion.li>
            </ul>
        </motion.div>
    </div>
</Slide>,
<Slide key="16">
        <div style={{ textAlign: 'center', width: '100%' }}>
            <h3 className="terminal-text" style={{ fontSize: '2rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '4rem' }}>[ LIVE TRANSLATION ]</h3>

            <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="glass-panel" style={{ padding: '4rem', display: 'inline-block', marginBottom: '4rem', border: '1px solid var(--color-accent-cyan)' }}>
                <h2 style={{ fontSize: '3rem', color: 'var(--color-text-secondary)', fontWeight: 300, marginBottom: '1rem' }}>TARGET</h2>
                <h1 style={{ fontSize: '6rem', color: '#fff', fontWeight: 900 }}>DDoS ATTACK</h1>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '5rem' }}>
                <span style={{ padding: '1rem 2rem', background: 'rgba(255,0,0,0.2)', color: 'var(--color-accent-red)', border: '1px solid var(--color-accent-red)', borderRadius: '8px', fontSize: '1.5rem', fontWeight: 600 }}>NO SERVER</span>
                <span style={{ padding: '1rem 2rem', background: 'rgba(255,0,0,0.2)', color: 'var(--color-accent-red)', border: '1px solid var(--color-accent-red)', borderRadius: '8px', fontSize: '1.5rem', fontWeight: 600 }}>NO TRAFFIC</span>
                <span style={{ padding: '1rem 2rem', background: 'rgba(255,0,0,0.2)', color: 'var(--color-accent-red)', border: '1px solid var(--color-accent-red)', borderRadius: '8px', fontSize: '1.5rem', fontWeight: 600 }}>NO NETWORK</span>
            </div>

            <motion.div initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} transition={{ type: 'spring' }}>
                <InteractiveTimer minutes={2} />
            </motion.div>
        </div>
    </Slide>,
<Slide key="17">
        <CinematicHold startFrame="/assets/ACT_5_yes_start.png" videoTransition="/assets/ACT_5_yes_transition.mp4" endFrame="/assets/ACT_5_yes_end.png" />
    </Slide>,
<Slide key="act5_tactic1">
    <div style={{ textAlign: 'center', maxWidth: '1200px' }}>
        <h3 className="terminal-red" style={{ fontSize: '1.5rem', letterSpacing: '0.3em', marginBottom: '2rem' }}>[ TACTIC 01: INVERT THE PROTOCOL ]</h3>
        <motion.h1 variants={stinsonFadeUp} initial="hidden" whileInView="visible" style={{ fontSize: '5rem', fontWeight: 700, color: '#fff', marginBottom: '4rem' }}>
            "YES" IS A TRAP.
        </motion.h1>
        
        <motion.div variants={stinsonStagger} initial="hidden" whileInView="visible" style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '5rem' }}>
            <motion.div variants={CardVariant} style={{ padding: '2rem 3rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h2 style={{ fontSize: '2rem', color: '#fff' }}>Commitment</h2>
            </motion.div>
            <motion.div variants={CardVariant} style={{ padding: '2rem 3rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h2 style={{ fontSize: '2rem', color: '#fff' }}>Confirmation</h2>
            </motion.div>
            <motion.div variants={CardVariant} style={{ padding: '2rem 3rem', background: 'rgba(255,0,0,0.1)', borderRadius: '12px', border: '1px solid rgba(255,0,0,0.3)' }}>
                <h2 style={{ fontSize: '2rem', color: 'var(--color-accent-red)' }}>Counterfeit</h2>
            </motion.div>
        </motion.div>

        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="terminal-cyan" style={{ fontSize: '3rem', fontWeight: 300, fontStyle: 'italic', letterSpacing: '0.05em' }}>
            "Trigger the <span style={{color: 'var(--color-accent-amber)'}}>NO</span> intentionally."
        </motion.h2>
    </div>
</Slide>,
<Slide key="19">
        <div style={{ textAlign: 'left', width: '100%', maxWidth: '1200px' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="glass-panel" style={{ padding: '4rem', marginBottom: '3rem', borderLeft: '4px solid var(--color-accent-cyan)' }}>
                <h3 className="terminal-cyan" style={{ fontSize: '1.2rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>TACTIC 02: MIRRORING</h3>
                <h2 style={{ fontSize: '3rem', color: '#fff', fontWeight: 300, fontStyle: 'italic' }}>
                    "Break the entire build?"
                </h2>
                <p style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)', marginTop: '2rem' }}>Repeat the last three words. Use the Late-Night FM DJ voice.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="glass-panel" style={{ padding: '4rem', borderLeft: '4px solid var(--color-accent-amber)' }}>
                <h3 className="terminal-amber" style={{ fontSize: '1.2rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>TACTIC 03: LABELING</h3>
                <h2 style={{ fontSize: '3rem', color: '#fff', fontWeight: 300, fontStyle: 'italic' }}>
                    "It sounds like you're terrified that my patch is going to cause a massive Saturday outage..."
                </h2>
                <p style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)', marginTop: '2rem' }}>Audit their emotional state so it loses its power.</p>
            </motion.div>
        </div>
    </Slide>,
<Slide key="18">
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '1200px' }}>
            <Globe size={60} color="var(--color-accent-cyan)" style={{ margin: '0 auto 4rem auto', opacity: 0.5 }} />
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="glass-panel" style={{ padding: '6rem', border: '1px solid rgba(0,255,255,0.2)' }}>
                <h3 className="terminal-cyan" style={{ fontSize: '1.5rem', letterSpacing: '0.1em', marginBottom: '2rem' }}>{'>'} TACTIC 04: THE_CALIBRATED_QUESTION</h3>
                <h1 style={{ fontSize: '6rem', color: 'var(--color-text-primary)', fontWeight: 400, fontStyle: 'italic', marginBottom: '3rem' }}>
                    "How am I supposed to do that?"
                </h1>
                <p style={{ fontSize: '2.5rem', color: 'var(--color-text-secondary)', fontWeight: 300 }}>
                    Hand the psychological burden of solving the impossible demand right back to them. And then... <strong style={{ color: '#fff' }}>stay silent.</strong>
                </p>
            </motion.div>
        </div>
    </Slide>,
<Slide key="20">
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: -1 }}>
            <motion.div initial={{ opacity: 0.8, scale: 0.8 }} animate={{ opacity: 0, scale: 2 }} transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }} style={{ width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,0,0.3) 0%, transparent 70%)' }} />
        </div>
        <div style={{ textAlign: 'center', maxWidth: '1200px', zIndex: 1 }}>
            <h3 className="terminal-red" style={{ fontSize: '1.5rem', letterSpacing: '0.3em', marginBottom: '2rem' }}>[ TACTIC 05: THE ACCUSATION AUDIT ]</h3>
            <motion.h1 initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} style={{ fontSize: '5.5rem', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>
                "You are going to hate me today. You are going to think I am killing the Q3 revenue target."
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} style={{ fontSize: '2.5rem', color: 'var(--color-text-secondary)', marginTop: '4rem', fontWeight: 300 }}>
                State their worst fears out loud.<br />Drain the fear from the room.
            </motion.p>
        </div>
    </Slide>,
    <Slide key="act6_trust">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/trust_battery_1772779470267.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.6, zIndex: -1 }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 100%)', zIndex: -1 }}></div>
        <div style={{ textAlign: 'left', maxWidth: '1200px', padding: '0 5%' }}>
            <h3 className="terminal-cyan" style={{ fontSize: '1.5rem', letterSpacing: '0.2em', marginBottom: '2rem' }}>[ THE PEACETIME PRE-MORTEM ]</h3>
            <motion.h1 variants={stinsonFadeUp} initial="hidden" whileInView="visible" style={{ fontSize: '4rem', fontWeight: 600, color: '#fff', marginBottom: '4rem', lineHeight: 1.2 }}>
                Charge the battery in peacetime,<br />so you can drain it in war.
            </motion.h1>
            
            <motion.div variants={stinsonStagger} initial="hidden" whileInView="visible" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '2rem 3rem', borderLeft: '4px solid var(--color-accent-cyan)' }}>
                    <h2 style={{ fontSize: '2rem', color: '#fff', fontWeight: 300 }}>1. What is the single biggest existential threat to your product launch this quarter?</h2>
                </motion.div>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '2rem 3rem', borderLeft: '4px solid var(--color-accent-amber)' }}>
                    <h2 style={{ fontSize: '2rem', color: '#fff', fontWeight: 300 }}>2. How does my security team accidentally generate friction for your developers?</h2>
                </motion.div>
                <motion.div variants={CardVariant} className="glass-panel" style={{ padding: '2rem 3rem', borderLeft: '4px solid var(--color-text-secondary)' }}>
                    <h2 style={{ fontSize: '2rem', color: '#fff', fontWeight: 300 }}>3. If we suffer a massive breach tomorrow, how do you want me to communicate with you?</h2>
                </motion.div>
            </motion.div>
        </div>
    </Slide>,
<Slide key="act6_black_swan">
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/black_swan.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -1 }}></div>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%, rgba(0,0,0,0.8) 100%)', zIndex: -1 }}></div>
    <div style={{ textAlign: 'center', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '6rem 0' }}>
        <h3 className="terminal-cyan" style={{ fontSize: '1.8rem', letterSpacing: '0.4em' }}>[ UNKNOWN VARIABLE DETECTED ]</h3>
        <motion.h1 initial={{ scale: 0.95, opacity: 0, filter: 'blur(10px)' }} whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }} transition={{ delay: 0.5, duration: 2, ease: "easeOut" }} style={{ fontSize: '7rem', fontWeight: 900, color: '#fff', letterSpacing: '0.1em', textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
            THE BLACK SWAN
        </motion.h1>
    </div>
</Slide>,
<Slide key="act6_punchline">
    <div style={{ textAlign: 'center', maxWidth: '1400px' }}>
        <Globe size={80} color="var(--color-accent-cyan)" style={{ margin: '0 auto 4rem auto', opacity: 0.3 }} />
        <motion.h1 variants={stinsonFadeUp} initial="hidden" whileInView="visible" style={{ fontSize: '6.5rem', fontWeight: 300, color: '#fff', lineHeight: 1.2 }}>
            Charge the battery in <span style={{color: 'var(--color-accent-cyan)', fontWeight: 700}}>peacetime</span>...
        </motion.h1>
        <motion.h1 initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} transition={{ delay: 1.5, duration: 2 }} style={{ fontSize: '7.5rem', fontWeight: 900, color: 'var(--color-accent-red)', marginTop: '2rem', letterSpacing: '-0.02em', textShadow: '0 0 40px rgba(255,0,0,0.4)' }}>
            SO YOU CAN DRAIN IT IN THE WAR.
        </motion.h1>
    </div>
</Slide>,
<Slide key="21">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/war_room_incident_1772744827936.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.6, zIndex: -1 }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,1) 5%, rgba(200,0,0,0.4) 100%)', mixBlendMode: 'multiply', zIndex: -1 }}></div>

        <motion.div initial={{ opacity: 0, scale: 1.1 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 3, ease: 'easeOut' }} style={{ textAlign: 'center' }}>
            <h2 className="terminal-red" style={{ fontSize: '3rem', letterSpacing: '0.2em', marginBottom: '2rem', textShadow: '0 0 20px rgba(255,0,0,0.8)' }}>
                [ 03:00:00 AM :: SATURDAY ]
            </h2>
            <h1 style={{ fontSize: '9rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', textShadow: '0 10px 50px rgba(0,0,0,0.9)' }}>
                A P1 INCIDENT.
            </h1>
            <ServerCrash size={80} color="var(--color-accent-red)" style={{ margin: '4rem auto 0 auto', opacity: 0.8 }} />
        </motion.div>
    </Slide>,
    <Slide key="act7_log">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/dark_war_room_1772225356705.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4, zIndex: -1 }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.9) 100%)', zIndex: -1 }}></div>
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div initial={{ height: 0 }} whileInView={{ height: 'auto' }} transition={{ duration: 0.5 }} className="glass-panel terminal-red" style={{ width: '80%', padding: '4rem', background: 'rgba(255,0,0,0.05)', border: '1px solid rgba(255,0,0,0.3)' }}>
                <div style={{ fontSize: '1.2rem', opacity: 0.5, marginBottom: '2rem' }}>
                    [SYS.LOG] TAIL -F /VAR/LOG/AUTH.LOG<br/>
                    ...<br/>
                    [15:23:01] CONNECTION ESTABLISHED FROM 192.168.1.104<br/>
                    [15:23:04] AUTHENTICATION FAILED FOR USER 'ADMIN'<br/>
                    [15:23:05] MULTIPLE FAILED ATTEMPTS DETECTED<br/>
                    [15:23:08] BYPASS DETECTED ON PORT 443<br/>
                    ...
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }} style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--color-accent-red)', letterSpacing: '0.1em' }}>
                    [UID: ROOT] // ACCESS COMPROMISED
                </motion.div>
            </motion.div>
        </div>
    </Slide>,
<Slide key="22">
        <div style={{ textAlign: 'center', maxWidth: '1200px' }}>
            <motion.h1 variants={stinsonFadeUp} initial="hidden" whileInView="visible" style={{ fontSize: '6rem', fontWeight: 600, color: '#fff' }}>
                A dashboard cannot bleed for the company.
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
                <h2 style={{ fontSize: '4rem', fontWeight: 300, color: 'var(--color-text-secondary)', marginTop: '4rem' }}>
                    An AI does not have <br />
                </h2>
                <h1 className="stinson-glow-text" style={{ color: 'var(--color-accent-cyan)', fontWeight: 900, fontSize: '8rem', marginTop: '1rem', letterSpacing: '-0.04em' }}>ACCOUNTABILITY.</h1>
            </motion.div>
        </div>
    </Slide>,
<Slide key="23">
        <CinematicHold startFrame="/assets/ACT_6_start.png" videoTransition="/assets/ACT_6_transition.mp4" endFrame="/assets/ACT_6_end.png" />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, #000 70%)', zIndex: -1 }}></div>
        <div style={{ position: 'relative', textAlign: 'center', maxWidth: '1400px', zIndex: 10 }}>
            <h3 className="terminal-text" style={{ fontSize: '1.5rem', letterSpacing: '0.5em', marginBottom: '4rem', color: 'rgba(255,255,255,0.5)' }}>
                [ LOCAL OVERRIDE: SISU ]
            </h3>
            <motion.h1 initial={{ scale: 0.95, opacity: 0, filter: 'blur(10px)' }} whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 1.5, ease: 'easeOut' }} style={{ fontSize: '8rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                The machine has perfect data.
            </motion.h1>
            <motion.h1 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1.5 }} style={{ fontSize: '6rem', fontWeight: 400, color: 'var(--color-text-secondary)', marginTop: '3rem', fontStyle: 'italic' }}>
                "Only humans carry the burden of fear."
            </motion.h1>
        </div>
    </Slide>,
    <Slide key="act7_horizon">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/geometric_horizon_sunrise_1772225369852.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8, zIndex: -1 }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)', zIndex: -1 }}></div>
        <div style={{ textAlign: 'center', width: '100%' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 2, ease: "easeOut" }}>
                <h1 style={{ fontSize: '8rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', textShadow: '0 0 50px rgba(255,255,255,0.4)' }}>
                    THE TRANSLATION LAYER
                </h1>
                <h2 className="terminal-cyan" style={{ fontSize: '2rem', letterSpacing: '0.5em', marginTop: '2rem' }}>
                    [ HUMAN PROTOCOL OVERRIDE ]
                </h2>
            </motion.div>
        </div>
    </Slide>,
    <Slide key="act7_promise">
        <div style={{ position: 'absolute', inset: 0, background: '#000', zIndex: -1 }}></div>
        <div style={{ textAlign: 'center', width: '100%', padding: '0 5%' }}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} style={{ fontSize: '5rem', fontWeight: 400, color: 'var(--color-text-secondary)', marginBottom: '3rem' }}>
                THE MACHINE EXPLAINS THE PROBLEM.
            </motion.h1>
            <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 2 }} style={{ fontSize: '8rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', textShadow: '0 0 40px rgba(0,255,255,0.2)' }}>
                YOU PROMISE TO FIX IT.
            </motion.h1>
        </div>
    </Slide>
];
