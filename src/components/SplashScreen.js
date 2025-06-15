import React, { useEffect } from 'react';

function SplashScreen({ setShowSplash }) {
    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 3000);
        return () => clearTimeout(timer);
    }, [setShowSplash]);

    return (
        <div className="splash-screen">
            <h1>AAPKA PAL</h1>
        </div>
    );
}

export default SplashScreen;