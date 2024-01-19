export default function ProgressBarApi({}) {
  return (
    <div className="fixed w-screen origin-left-right">
      <div className="h-1.5 bg-white overflow-hidden">
        <div
          className={`${'animate-progress'} h-full bg-seagreen origin-left-right`}
        ></div>
      </div>
    </div>
  );
}
