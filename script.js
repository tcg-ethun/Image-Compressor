let originalFile = null;  
let compressedFile = null;  

// Handle image upload
document.getElementById('imageUpload').addEventListener('change', function(e) {  
    const file = e.target.files[0];  
    if (!file) return;  // If no file selected, exit

    originalFile = file;  
    
    const reader = new FileReader();  
    reader.onload = function(event) {  
        const img = document.getElementById('originalImage');  
        img.src = event.target.result;  
        
        document.getElementById('originalSize').textContent =   
           ` ${(file.size / 1024).toFixed(2)} KB`;  
    };  
    reader.readAsDataURL(file);  
});  

// Compress image
function compressImage() {  
    if (!originalFile) {  
        alert('Please upload an image first!');  
        return;  
    }  

    const canvas = document.createElement('canvas');  
    const ctx = canvas.getContext('2d');  
    const img = new Image();  

    const quality = parseFloat(document.getElementById('qualitySelect').value);  
    const resizeRatio = parseFloat(document.getElementById('resizeSelect').value);  

    img.onload = function() {  
        // Resize the canvas to the new image dimensions
        canvas.width = img.width * resizeRatio;  
        canvas.height = img.height * resizeRatio;  

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);  

        // Convert canvas to blob and handle compression
        canvas.toBlob((blob) => {  
            compressedFile = blob;  
            const compressedUrl = URL.createObjectURL(blob);  
            
            document.getElementById('compressedImage').src = compressedUrl;  
            document.getElementById('compressedSize').textContent =   
                `${(blob.size / 1024).toFixed(2)} KB`;  
            
            // Show the download button after compression
            document.getElementById('downloadBtn').style.display = 'block';  
        }, 'image/jpeg', quality);  
    };  

    img.src = URL.createObjectURL(originalFile);  
}  

// Download the compressed image
function downloadCompressedImage() {  
    if (!compressedFile) {  
        alert('No compressed image available');  
        return;  
    }  

    const link = document.createElement('a');  
    link.href = URL.createObjectURL(compressedFile);  
    link.download = 'image.png';  
    link.click();  
}