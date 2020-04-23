import Swal from 'sweetalert2'

let fileValid = false;

function validateForm() {
    const title = document.forms.videoupload.title.value;
    const description = document.forms.videoupload.description.value;
    const tags = document.forms.videoupload.tags.value
    const category = document.forms.videoupload.category.value
    console.log("1213", category)
    if (title < 8 || title > 64) {
        return false
    }

    

    if (description > 2048) {
        return false;
    }

    return true && fileValid;
}

function handleFileUpload(files) {
    const file = files[0];
    
    const mimeTypeArray = file.type.split("/");

    if (mimeTypeArray[0] !== "video") {
        fileValid = false;
        return;
    }

    const fileSize = file.size;

    const twoBytes = 2147483648
    if (fileSize > twoBytes) {
        fileValid = false;
        return;
    }

    if( fileValid == false){
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
    }


    fileValid = true

}