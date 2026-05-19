import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBg() {
    const [init, setInit] = useState(false);

    const options = useMemo(() => ({
        background: {
            color: { value: "transparent" },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab",
                },
            },
            modes: {
                grab: {
                    distance: 140,
                    links: { opacity: 1 },
                },
            },
        },
        particles: {
            color: { value: "#3f3f46" },
            links: {
                color: "#3f3f46",
                distance: 150,
                enable: true,
                opacity: 0.4,
                width: 1,
                triangles: {
                    enable: true,
                    opacity: 0.05,
                },
            },
            move: {
                enable: true,
                speed: 1,
            },
            number: {
                value: 80,
                density: {
                    enable: true,
                },a
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    }), []);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            className="fixed inset-0 -z-10"
            options={options}
        />
    );
}