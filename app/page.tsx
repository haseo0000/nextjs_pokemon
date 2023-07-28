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
import Skeleton from "@mui/material/Skeleton";

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
      <div
        style={{ boxShadow: "10px 10px 5px 0 gray" }}
        className="flex flex-col items-center border-4 rounded-3xl border-blue-900 p-5 bg-blue-300">
        <div className="relative w-80 h-80 sm:w-96 bg-white border-8 border-gray-500 rounded-2xl grid place-items-center">
          {loading ? (
            <ReactLoading
              type={"spin"}
              color={"black"}
              width={100}
              height={100}
            />
          ) : (
            <>
              <img src={data.image} alt={data.image} className="w-56 sm:w-64" />
              <PokemonType pokemonType={data.type} />
            </>
          )}
        </div>
        <div className="mt-10">
          {loading ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={250}
              height={50}
            />
          ) : (
            <span className="text-4xl sm:text-6xl uppercase">{data.name}</span>
          )}
        </div>
        <div className="flex gap-5 mt-10">
          {/* {number > 1 && (
            <button
              className="border border-black rounded-lg px-8 py-3 bg-black"
              onClick={handleBack}>
              <span className="text-white">Back</span>
            </button>
          )} */}
          <button
            className="border rounded-lg px-8 py-3 bg-blue-950"
            onClick={handleNext}>
            <span className="text-white">NEXT</span>
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
