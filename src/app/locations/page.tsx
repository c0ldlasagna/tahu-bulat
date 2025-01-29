import { FC } from "react";
import { overlock } from "../fonts";

const LocationsPage: FC = () => {
    const locations = [
        { name: "Tahu Bulat 25 - Depok", address: "Jl. Margonda Raya No. 25, Depok" },
        { name: "Tahu Bulat 25 - Jakarta Pusat", address: "Jl. Thamrin No. 58, Jakarta Pusat" },
        { name: "Tahu Bulat 25 - Bandung", address: "Jl. Dago No. 42, Bandung" },
        { name: "Tahu Bulat 25 - Surabaya", address: "Jl. Tunjungan No. 101, Surabaya" },
        { name: "Tahu Bulat 25 - Yogyakarta", address: "Jl. Malioboro No. 15, Yogyakarta" },
        { name: "Tahu Bulat 25 - Medan", address: "Jl. Sisingamangaraja No. 88, Medan" },
        { name: "Tahu Bulat 25 - Denpasar", address: "Jl. Sunset Road No. 25, Denpasar" },
        { name: "Tahu Bulat 25 - Semarang", address: "Jl. Pemuda No. 50, Semarang" },
        { name: "Tahu Bulat 25 - Makassar", address: "Jl. Pantai No. 33, Makassar" },
        { name: "Tahu Bulat 25 - Batam", address: "Jl. Seipanas No. 44, Batam" },
        { name: "Tahu Bulat 25 - Cirebon", address: "Jl. Siliwangi No. 10, Cirebon" },
        { name: "Tahu Bulat 25 - Solo", address: "Jl. Slamet Riyadi No. 120, Solo" },
        { name: "Tahu Bulat 25 - Surakarta", address: "Jl. Alun-Alun No. 8, Surakarta" },
        { name: "Tahu Bulat 25 - Jambi", address: "Jl. Merdeka No. 44, Jambi" },
        { name: "Tahu Bulat 25 - Pontianak", address: "Jl. Alian No. 50, Pontianak" },
        { name: "Tahu Bulat 25 - Bekasi", address: "Jl. Raya No. 30, Bekasi" },
        { name: "Tahu Bulat 25 - Tangerang Selatan", address: "Jl. Alam No. 25, Tangerang Selatan" },
        { name: "Tahu Bulat 25 - Palembang", address: "Jl. Alang-Alang Lebar No. 10, Palembang" },
        { name: "Tahu Bulat 25 - Aceh", address: "Jl. Merdeka No. 20, Banda Aceh" },
        { name: "Tahu Bulat 25 - Balikpapan", address: "Jl. Sudirman No. 75, Balikpapan" },
        { name: "Tahu Bulat 25 - Lombok", address: "Jl. Raya Senggigi No. 10, Lombok" },
        { name: "Tahu Bulat 25 - Medan", address: "Jl. Merdeka No. 18, Medan" },
        { name: "Tahu Bulat 25 - Surabaya East", address: "Jl. Raya Gubeng No. 10, Surabaya" },
        { name: "Tahu Bulat 25 - Pontianak City", address: "Jl. Sejahtera No. 88, Pontianak" },
        { name: "Tahu Bulat 25 - Pekanbaru", address: "Jl. Riau No. 55, Pekanbaru" },
        { name: "Tahu Bulat 25 - Banyuwangi", address: "Jl. Raya Banyuwangi No. 12, Banyuwangi" }
      ];
      

  return (
    <div className="min-h-screen w-full bg-gray-200 mx-auto px-4 py-8">
      <h1 className={`${overlock.className} text-black text-3xl font-semibold text-center mx-8 mb-10`}>Find Tahu Bulat 25 Locations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {locations.map((location, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className={`${overlock.className} text-xl text-black font-semibold mb-2`}>{location.name}</h2>
            <p className={`${overlock.className} text-black`}>{location.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;
