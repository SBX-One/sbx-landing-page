"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import Tag from "./ui/Tag";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        <IoMenu className="text-2xl" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-neutral-900 p-4 py-6 flex flex-col justify-between">
          <div className="flex flex-col gap-16">
            <div className="flex items-center justify-between">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={999}
                height={999}
                className="w-12"
              />

              <div className="flex items-center gap-3">
                <Button
                  as="link"
                  color="white"
                  style="standard"
                  size="md"
                  leftIcon={true}
                  href="/about"
                >
                  Start a Project
                </Button>
                <button
                  className="bg-neutral-600 p-3 rounded-full"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Icon type="close" theme="light" height={24} width={24} />
                </button>
              </div>
            </div>
            <ul className="flex gap-2">
              <li>
                <Tag as="link" style="pixel" size="sm" href="#">
                  Instagram
                </Tag>
              </li>
              <li>
                <Tag as="link" style="pixel" size="sm" href="#">
                  Dribble
                </Tag>
              </li>
              <li>
                <Tag as="link" style="pixel" size="sm" href="#">
                  Behance
                </Tag>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="flex items-center justify-between py-8 border-b border-neutral-500">
                <div className="flex items-center gap-5">
                  <span className="font-pixelify-sans">[ 01 ]</span>
                  <span className="text-heading-6 font-medium">About</span>
                </div>
                <Icon type="default" theme="light" height={32} width={32} />
              </li>
              <li className="flex items-center justify-between py-8 border-b border-neutral-500">
                <div className="flex items-center gap-5">
                  <span className="font-pixelify-sans">[ 02 ]</span>
                  <span className="text-heading-6 font-medium">Projects</span>
                </div>
                <Icon type="default" theme="light" height={32} width={32} />
              </li>
              <li className="flex items-center justify-between py-8 border-b border-neutral-500">
                <div className="flex items-center gap-5">
                  <span className="font-pixelify-sans">[ 03 ]</span>
                  <span className="text-heading-6 font-medium">Pricing</span>
                </div>
                <Icon type="default" theme="light" height={32} width={32} />
              </li>
              <li className="flex items-center justify-between py-8 border-b border-neutral-500">
                <div className="flex items-center gap-5">
                  <span className="font-pixelify-sans">[ 04 ]</span>
                  <span className="text-heading-6 font-medium">FAQ</span>
                </div>
                <Icon type="default" theme="light" height={32} width={32} />
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
