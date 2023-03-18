export function generateSlides( length = 10, sig = 0 ) {
    return Array.from( { length } ).map( ( _, index ) => {
      index = sig || index;
  
      return {
        src: `https://source.unsplash.com/random/800x450?sig=${ index }`,
        alt: `Image ${ index }`,
      };
    } );
  }