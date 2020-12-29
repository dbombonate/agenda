export default function honeyPot(){
    const ohNooClass = document.querySelectorAll('.ohhnooo');

    for (let i = 0; i < ohNooClass.length; i++) {
        const element = ohNooClass[i];
        element.style.position = 'absolute';
        element.style.opacity = 0;
        element.style.top = 0;
        element.style.left = 0;
        element.style.height = 0;
        element.style.width = 0;
        element.style.zindex = -1;

    }
}
