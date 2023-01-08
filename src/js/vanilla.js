import VanillaTilt from "vanilla-tilt";

export function setVanillaTiltAnimation() {
    const element = document.querySelectorAll('.movieCard')
    const options = {
        glare: true,
        spead: 250,
    }
    
    VanillaTilt.init(element, options)
}
