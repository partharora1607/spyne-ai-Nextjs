import { toast } from "react-toastify";

export const downloadSingleImage = ({ imageUrl = "", imageName = "" }) => {
    try {
        if (!imageUrl){
            toast("Oops! We couldn't find the image you're trying to download, please try again",{ hideProgressBar: true, autoClose: 2000, type: 'error', position: 'bottom-center', pauseOnHover: true })
            return;
        }
        toast('Your download has started',{ hideProgressBar: true, autoClose: 2000, type: 'success', position: 'bottom-center', pauseOnHover: true })
        const output_link = imageUrl;
        fetch(output_link, {
            method: "GET",
            mode: 'cors',
            credentials: 'include',
            'cache': 'no-store' // download fresh file
        })
            .then((response) => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    let name = output_link;
                    var index = name?.lastIndexOf("/") + 1;
                    var extension = output_link?.split(".").reverse();
                    extension = extension[0];

                    if (imageName === '') {
                        let imgName = output_link.split("/").pop().split('#')[0].split('?')[0];
                        imageName = imgName;
                        var filename = imageName;
                    }
                    else {
                        var filename = imageName + "." + extension;
                    }

                    if (imageName == "null") {
                        var filename = name.substr(index);
                    }

                    link.setAttribute("download", filename);
                    document.body.appendChild(link);
                    link.click();

                    // Clean up and remove the link
                    link.parentNode.removeChild(link);

                });
            })
            // Need to debug aboove method for downloading. For now we are opening the images in new tab to dwonload this images.
            .catch((err) => {
                window.open(output_link, "_blank");
            });
    } catch (error) {
        toast('Oh no! Your download failed, please check your network connection and try again',{ hideProgressBar: true, autoClose: 2000, type: 'error', position: 'bottom-center', pauseOnHover: true });
    }

}
