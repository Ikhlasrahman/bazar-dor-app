import Image from 'next/image';




const MainHeader = () => {
    return (
        <div className="border-t-2 border-gray-700">
            <div className="relative mx-auto flex max-w-240 items-center justify-center px-4 py-4">

                {/* Centered Logo + Brand */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={40}
                        height={40}
                    />

                    <div className="flex flex-col">
                        <h1 className="font-serif text-[24px] font-bold leading-6 text-red-800">
                            Bangla News 24
                        </h1>

                        <p className="text-[12px] text-gray-600">
                            {new Intl.DateTimeFormat("bn-BD", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }).format(new Date())}
                        </p>
                    </div>
                </div>

                {/* Right-side Buttons */}
                <button>সাইন ইন </button>
                <button className='btn btn-success'>সাইন আপ</button>

            </div>
        </div>
    );
};

export default MainHeader;