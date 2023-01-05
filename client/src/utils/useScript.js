import {useEffect} from "react";

const useScript = url => {
    useEffect(() => {
        const outDiv = document.createElement('div');
        const div = document.createElement('div');
        outDiv.id = 'container';
        outDiv.style = 'display: flex; align-items: center; justify-content: center'
        div.id = 'map';
        div.style = `width: ${window.innerWidth}px; height: ${window.innerHeight}px`;
        div.async = true;
        document.body.appendChild(outDiv);
        document.getElementById('container').appendChild(div)

        return () => {
            document.body.removeChild(div);
        }
    }, [url]);
};

export default useScript;