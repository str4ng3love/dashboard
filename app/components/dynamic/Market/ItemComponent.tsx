'use client'

import { MarketItem } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import SpinnerMini from "../../static/SpinnerMini"
import { useEffect, useState } from "react"
interface Props {
  item: MarketItem
}
const ItemComponent = ({ item }: Props) => {
  const [currency, setCurrency] = useState({ name: "initial", rate: 1 });

  useEffect(() => {
    window.addEventListener("currency", () => {
      const currency = localStorage.getItem("currency");
      if (currency) {
        let selectedCurrency = JSON.parse(currency);
        setCurrency({
          name: selectedCurrency.name,
          rate: selectedCurrency.rate,
        });
      } else {
        setCurrency({
          name: "usd",
          rate: 1,
        });
      }
    });
    return () => {
      window.removeEventListener("currency", () => { });
    };
  }, []);

  useEffect(() => {
    let prefCurrency = localStorage.getItem("currency");
    if (prefCurrency) {
      let selectedCurrency = JSON.parse(prefCurrency);
      setCurrency({
        name: selectedCurrency.name,
        rate: selectedCurrency.rate,
      });
    }
    if (!prefCurrency) {
      setCurrency({
        name: "usd",
        rate: 1,
      });
    }
  }, []);
  return (


    <Link
      href={`/item/${item.item}`}
      className="relative overflow-hidden ring-2 p-1 my-1 hover:bg-gradient-to-tl from-link via-link_active to-link transition-all duration-300 h-20 flex justify-between "
    >
      <div className="flex">
        <Image
          style={{ objectFit: "cover", width: "150px", height: "auto" }}
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL={"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkOAMAANIAzr59FiYAAAAASUVORK5CYII="}
          alt="Item's Image"
          src={item.images[0]}
        />
        <div className="p-2 flex flex-col justify-between">
          <span className="md:text-base text-sm sm:text-sm overflow-hidden text-ellipsis">
            {item.item}
          </span>
          <span className="self-end md:text-sm text-xs sm:inline-block hidden">
            {item.preorder && item.releaseDate && item.releaseDate > new Date(Date.now()) ? `Available from: ${item.releaseDate.toUTCString().slice(0, -7)}` : ""}
          </span>
        </div>
        <span className="self-end text-sm w-40 p-2 h-full hidden md:block overflow-clip text-ellipsis">
          {item.amount ? "In stock" : "out of stock"}
        </span>

      </div>
      <div className="text-sm  hidden sm:flex">

        <span className="justify-end self-center font-semibold  px-2 lg:text-lg overflow-hidden text-ellipsis flex">
          {currency.name === "initial" ? (
            <SpinnerMini />
          ) : (
            (item.price * currency.rate).toFixed(2)
          )}
          &nbsp;
          {currency.name !== "initial"
            ? currency.name.toLocaleUpperCase()
            : ""}
        </span>
      </div>
      {item.preorder === true && item.releaseDate !== null && item.releaseDate >= new Date(Date.now()) ? (
        <span className="p-1 absolute whitespace-nowrap flex items-center -rotate-[55deg] text-lg translate-x-[-30%] top-1/4 w-[8rem] justify-center left-0 h-8 bg-violet-600">
          Preorder
        </span>
      ) : (
        <></>
      )}
    </Link>


  )
}
export default ItemComponent