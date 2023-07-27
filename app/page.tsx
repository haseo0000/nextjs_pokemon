"use client";

import { useEffect, useState } from "react";
import { fetchDataPokemon } from "../utils/fetchData";
import Modal from "@mui/material/Modal";
import PokemonType from "../components/pokemonType";
import { PokemonHome } from "@/types/pokemonTypes";
import ReactLoading from "react-loading";
import { HiPlusCircle, HiMinusCircle } from "react-icons/hi";
import { GiHandBag, GiArchiveResearch, GiTreasureMap } from "react-icons/gi";
import CustomIcon from "@/components/customIcon";
import Link from "next/link";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { addBag, decrementBag } from "@/redux/bag";
import ModalBag from "@/components/modalBag";

export default function Home() {
  const randomNumber = Math.floor(Math.random() * 1001);

  const [data, setData] = useState({} as PokemonHome);
  // change from useState to redux
  // const [bag, setBag] = useState<PokemonHome[]>([]);
  const [number, setNumber] = useState<number>(randomNumber);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModalBag, setOpenModalBag] = useState(false);
  const [openModalMap, setOpenModalMap] = useState(false);

  const { bag } = useSelector((state: RootState) => state.bag);
  const dispatch = useDispatch();

  const findPokemon = bag.findIndex((item) => item.name === data.name);

  const getData = async () => {
    const respones = await fetchDataPokemon(number);
    setData({
      name: respones.name,
      image: respones.sprites?.other.home.front_default,
      type: respones.types.map((item: any) => item.type.name),
    });
    setLoading(false);
  };

  const handleNext = () => {
    setNumber(randomNumber);
  };

  const handleBack = () => {
    if (number === 1) return;
    setNumber((prev) => prev);
  };

  const handleAddBag = () => {
    dispatch(addBag({ pokemon: data }));
    // setBag((prev) => [...prev, data]);
  };

  const handleRemoveBag = (itemBag?: PokemonHome) => {
    if (itemBag) {
      dispatch(decrementBag({ pokemon: itemBag }));
      // setBag((prev) => prev.filter((item) => item.name !== itemBag.name));
      return;
    }
    dispatch(decrementBag({ pokemon: data }));
    // setBag((prev) => prev.filter((item) => item.name !== data.name));
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, [number]);

  if (Object.keys(data).length === 0) return;

  return (
    <>
      <div className="relative flex flex-col items-center border-4 border-gray-600 p-5 bg-blue-300">
        {loading ? (
          <div
            style={{ minHeight: "450px" }}
            className="grid place-items-center ">
            <ReactLoading
              type={"spin"}
              color={"black"}
              height={250}
              width={250}
            />
          </div>
        ) : (
          <>
            <PokemonType pokemonType={data.type} />
            <img src={data.image} alt={data.image} width={350} height={350} />
            <div className="mt-10">
              <span className="text-4xl sm:text-6xl uppercase">
                {data.name}
              </span>
            </div>
          </>
        )}
        <div className="flex gap-5 mt-10">
          {/* {number > 1 && (
            <button
              className="border border-black rounded-lg px-8 py-3 bg-black"
              onClick={handleBack}>
              <span className="text-white">Back</span>
            </button>
          )} */}
          <button
            className="border border-black rounded-lg px-8 py-3 bg-black"
            onClick={handleNext}>
            <span className="text-white">Next</span>
          </button>
        </div>
        <div className="flex gap-5 mt-10">
          {findPokemon === -1 ? (
            <button
              className="rounded-full p-3 bg-green-500"
              onClick={handleAddBag}>
              <span className="text-white text-3xl">
                <HiPlusCircle />
              </span>
            </button>
          ) : (
            <button
              className="rounded-full p-3 bg-red-500"
              onClick={() => handleRemoveBag()}>
              <span className="text-white text-3xl">
                <HiMinusCircle />
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="flex gap-4 mt-10 mb-5">
        <CustomIcon
          handleClick={() => setOpenModalBag(true)}
          bag={bag}
          icon={<GiHandBag />}
          bgColor="bg-orange-900"
          tooltip="BAG"
        />
        <Link href={`/find`}>
          <CustomIcon
            icon={<GiArchiveResearch />}
            bgColor="bg-green-400"
            tooltip="SEARCH"
          />
        </Link>
        <CustomIcon
          handleClick={() => setOpenModalMap(true)}
          icon={<GiTreasureMap />}
          bgColor="bg-orange-500"
          tooltip="MAP"
        />
      </div>
      <ModalBag openModal={openModalBag} closeModal={setOpenModalBag} />
      <Modal
        className="grid place-items-center"
        open={openModalMap}
        onClose={() => setOpenModalMap(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className="bg-red-500 p-5">Map</div>
      </Modal>
    </>
  );
}
