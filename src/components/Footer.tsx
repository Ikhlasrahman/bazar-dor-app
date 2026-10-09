
const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 sm:flex-row sm:items-center sm:px-6">
        <p className="text-sm font-normal leading-5 text-base-content">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="text-sm font-normal leading-5 text-base-content">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
