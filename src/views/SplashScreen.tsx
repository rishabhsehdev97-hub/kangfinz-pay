import React from "react";

const SplashScreen = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-emerald-400">K</h1>

        <h2 className="mt-4 text-3xl font-bold text-white">
          KANGFINZ PAY
        </h2>

        <p className="mt-2 text-gray-400">
          Your Complete Financial Universe
        </p>

        <div className="mt-10">
          <div className="mx-auto h-2 w-24 overflow-hidden rounded-full bg-gray-700">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-emerald-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;