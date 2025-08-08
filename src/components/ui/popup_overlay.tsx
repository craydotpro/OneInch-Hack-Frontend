export default function PopupOverlay() {
  return (
    <div
      className={`absolute top-0 left-0 z-20 flex h-screen w-screen bg-black/70 transition-all duration-150 backdrop-blur-sm `}
      style={{
        animationDuration: ".2s",
        transform: "translate3d(0, 0, 0)",
      }}
    ></div>
  );
}
