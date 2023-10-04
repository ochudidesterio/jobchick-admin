import React from 'react';

const GalleryView = ({ images }) => {
  console.log("Images", images);

  return (
    <div className='gallery'>
      {images.length === 0 ? (
        <p>No images available</p>
      ) : (
        images.map((image, index) => (
          <div key={index} className="imgHolder">
            <img src={image.url} alt={`holder ${index}`} />
          </div>
        ))
      )}
    </div>
  );
};

export default GalleryView;
