function ExampleCarouselImage({ text }) {
  return (
    <div
      style={{
        height: '500px',
        width: '100%',
        backgroundColor: '#868e96',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px'
      }}
    >
      {text}
    </div>
  );
}

export default ExampleCarouselImage;