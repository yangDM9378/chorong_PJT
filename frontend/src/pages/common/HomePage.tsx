import Home from '../../components/common/home/Home';

export default function HomePage() {
  return (
    <div
      className="font-GmarketSansMedium w-[100vw] h-[100vh]"
      style={{
        backgroundImage: `url(/main/bg/bg0.png)`,
        backgroundSize: 'cover',
      }}
    >
      <Home />
    </div>
  );
}
