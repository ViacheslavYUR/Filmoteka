import VanillaTilt from "vanilla-tilt";

export function setVanillaTiltAnimation() {
    const element = document.querySelectorAll('.movieCard')
    const options = {
        glare: true,
        speed: 2500,
    }
    
    VanillaTilt.init(element, options)
}
