'use client';

import React, { useState } from 'react';

export type PompomState = 'idle' | 'eating' | 'sleeping' | 'sad' | 'play';

export interface PompomPixelProps {
  state?: PompomState;
  outfit?: string;
  accessory?: string;
  isSleepingInBed?: boolean;
  isDirty?: boolean;
  isSoapy?: boolean;
  onClick?: () => void;
  className?: string;
  size?: number; // Size in pixels, default 240
}

export const PompomPixel: React.FC<PompomPixelProps> = ({
  state = 'idle',
  outfit = 'none',
  accessory = 'none',
  isSleepingInBed = false,
  isDirty = false,
  isSoapy = false,
  onClick,
  className = '',
  size = 240,
}) => {
  const [isSquished, setIsSquished] = useState(false);
  const [blink, setBlink] = useState(false);

  // Periodic eye blink in idle state
  React.useEffect(() => {
    if (state !== 'idle') return;
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 3500);
    return () => clearInterval(interval);
  }, [state]);

  const handleClick = () => {
    setIsSquished(true);
    setTimeout(() => setIsSquished(false), 250);
    if (onClick) onClick();
  };

  // Determine state animation class
  let stateAnimClass = 'anim-bounce';
  if (state === 'sleeping') stateAnimClass = 'anim-breathing';
  if (state === 'eating') stateAnimClass = 'anim-chew';
  if (state === 'play') stateAnimClass = 'anim-play';

  return (
    <div
      onClick={handleClick}
      style={{
        width: size,
        height: size,
        cursor: 'pointer',
        userSelect: 'none',
        display: 'inline-block',
      }}
      className={`relative select-none transition-transform duration-150 ${className}`}
      title="Click Pompom!"
    >
      <style>{`
        @keyframes pompomBounce {
          0%, 100% { transform: translateY(0px) scale(1, 1); }
          50% { transform: translateY(-4px) scale(0.98, 1.02); }
        }
        @keyframes pompomChew {
          0%, 100% { transform: scale(1, 1); }
          25% { transform: scale(1.04, 0.96) translateY(1px); }
          75% { transform: scale(0.96, 1.04) translateY(-1px); }
        }
        @keyframes pompomBreathing {
          0%, 100% { transform: scale(1, 1); }
          50% { transform: scale(1.02, 0.98); }
        }
        @keyframes pompomPlay {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-6px) rotate(-3deg); }
          75% { transform: translateY(-6px) rotate(3deg); }
        }
        @keyframes zzzFloat {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translate(12px, -24px) scale(1.2); opacity: 0; }
        }
        @keyframes sparkleTwinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes flyHover {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(4px, -5px); }
          50% { transform: translate(-3px, -8px); }
          75% { transform: translate(-5px, -2px); }
        }
        @keyframes bubbleFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-3px) scale(1.1); }
        }

        .anim-bounce { animation: pompomBounce 2s ease-in-out infinite; }
        .anim-chew { animation: pompomChew 0.5s ease-in-out infinite; }
        .anim-breathing { animation: pompomBreathing 3s ease-in-out infinite; }
        .anim-play { animation: pompomPlay 0.6s ease-in-out infinite; }
        .anim-zzz1 { animation: zzzFloat 2.4s ease-out infinite; animation-delay: 0s; }
        .anim-zzz2 { animation: zzzFloat 2.4s ease-out infinite; animation-delay: 0.8s; }
        .anim-sparkle1 { animation: sparkleTwinkle 1.2s ease-in-out infinite; animation-delay: 0s; }
        .anim-sparkle2 { animation: sparkleTwinkle 1.2s ease-in-out infinite; animation-delay: 0.4s; }
        .anim-sparkle3 { animation: sparkleTwinkle 1.2s ease-in-out infinite; animation-delay: 0.8s; }
        .anim-fly { animation: flyHover 1.5s ease-in-out infinite; }
        .anim-bubble { animation: bubbleFloat 2s ease-in-out infinite; }
      `}</style>

      <div
        style={{
          width: '100%',
          height: '100%',
          transform: isSquished ? 'scale(1.18, 0.82)' : 'scale(1, 1)',
          transformOrigin: 'bottom center',
          transition: 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        <svg
          viewBox="0 0 48 48"
          style={{ width: '100%', height: '100%', shapeRendering: 'crispEdges' }}
        >
          {/* ====================================================================== */}
          {/* LAYER 1: BED & PILLOW (Rendered if isSleepingInBed === true)          */}
          {/* ====================================================================== */}
          {isSleepingInBed && (
            <g id="layer-bed-base">
              {/* Wooden Bed Base Frame */}
              <rect x="4" y="32" width="40" height="12" fill="#5C3823" />
              <rect x="4" y="32" width="40" height="2" fill="#8B5A3C" />
              <rect x="4" y="42" width="40" height="2" fill="#3D2314" />
              <rect x="2" y="30" width="4" height="14" fill="#3D2314" />
              <rect x="42" y="30" width="4" height="14" fill="#3D2314" />

              {/* Soft Cream Pillow */}
              <rect x="8" y="14" width="32" height="16" fill="#FFFDF5" rx="1" />
              <rect x="9" y="15" width="30" height="14" fill="#F4EEDC" />
              <rect x="11" y="17" width="26" height="10" fill="#FFFFFF" />
              {/* Pillow Stitching lines */}
              <rect x="10" y="16" width="1" height="12" fill="#E2D7BE" />
              <rect x="37" y="16" width="1" height="12" fill="#E2D7BE" />
            </g>
          )}

          {/* ====================================================================== */}
          {/* LAYER 2: POMPOM BASE BODY & EXPRESSIONS                               */}
          {/* ====================================================================== */}
          <g id="layer-pompom-body" className={stateAnimClass}>
            {/* Ground Shadow (if not in bed) */}
            {!isSleepingInBed && (
              <ellipse cx="24" cy="37" rx="12" ry="3" fill="#4A152B" opacity="0.2" />
            )}

            {/* --- EARS --- */}
            {state === 'sad' ? (
              // Droopy Ears for Sad State
              <g id="droopy-ears">
                {/* Left Ear Droopy */}
                <rect x="9" y="16" width="6" height="5" fill="#4A152B" />
                <rect x="10" y="17" width="4" height="3" fill="#F6A5C0" />
                <rect x="11" y="18" width="2" height="2" fill="#EE6B94" />
                {/* Right Ear Droopy */}
                <rect x="33" y="16" width="6" height="5" fill="#4A152B" />
                <rect x="34" y="17" width="4" height="3" fill="#F6A5C0" />
                <rect x="35" y="18" width="2" height="2" fill="#EE6B94" />
              </g>
            ) : (
              // Normal Upright Pomeranian/Bear Ears
              <g id="upright-ears">
                {/* Left Ear Outer Outline */}
                <rect x="11" y="10" width="7" height="7" fill="#4A152B" />
                {/* Left Ear Base Fill */}
                <rect x="12" y="11" width="5" height="5" fill="#F6A5C0" />
                {/* Left Ear Inner Pink */}
                <rect x="13" y="12" width="3" height="3" fill="#EE6B94" />

                {/* Right Ear Outer Outline */}
                <rect x="30" y="10" width="7" height="7" fill="#4A152B" />
                {/* Right Ear Base Fill */}
                <rect x="31" y="11" width="5" height="5" fill="#F6A5C0" />
                {/* Right Ear Inner Pink */}
                <rect x="32" y="12" width="3" height="3" fill="#EE6B94" />
              </g>
            )}

            {/* --- MAIN ROUND MOCHI BODY --- */}
            <g id="body-main">
              {/* Dark Berry Outline */}
              <rect x="14" y="14" width="20" height="21" fill="#4A152B" />
              <rect x="12" y="16" width="24" height="17" fill="#4A152B" />
              <rect x="16" y="34" width="16" height="3" fill="#4A152B" />

              {/* Main Body Base Fill */}
              <rect x="14" y="15" width="20" height="19" fill="#F6A5C0" />
              <rect x="13" y="17" width="22" height="15" fill="#F6A5C0" />

              {/* Body Bottom Shadow */}
              <rect x="15" y="30" width="18" height="3" fill="#DF7B9D" />
              <rect x="17" y="33" width="14" height="1" fill="#DF7B9D" />

              {/* Body Top/Forehead Cream Highlight */}
              <rect x="18" y="15" width="12" height="2" fill="#FCDCE5" />
              <rect x="20" y="17" width="8" height="1" fill="#FCDCE5" />
            </g>

            {/* --- HANDS --- */}
            {state === 'play' ? (
              // Raised Joyful Hands
              <g id="hands-raised">
                {/* Left Hand Raised */}
                <rect x="8" y="16" width="4" height="4" fill="#4A152B" />
                <rect x="9" y="17" width="2" height="2" fill="#F6A5C0" />
                {/* Right Hand Raised */}
                <rect x="36" y="16" width="4" height="4" fill="#4A152B" />
                <rect x="37" y="17" width="2" height="2" fill="#F6A5C0" />
              </g>
            ) : (
              // Normal Resting Hands
              <g id="hands-normal">
                {/* Left Hand */}
                <rect x="9" y="24" width="4" height="4" fill="#4A152B" />
                <rect x="10" y="25" width="2" height="2" fill="#F6A5C0" />
                {/* Right Hand */}
                <rect x="35" y="24" width="4" height="4" fill="#4A152B" />
                <rect x="36" y="25" width="2" height="2" fill="#F6A5C0" />
              </g>
            )}

            {/* --- FEET --- */}
            <g id="feet">
              {/* Left Foot */}
              <rect x="16" y="34" width="5" height="3" fill="#4A152B" />
              <rect x="17" y="34" width="3" height="2" fill="#DF7B9D" />
              {/* Right Foot */}
              <rect x="27" y="34" width="5" height="3" fill="#4A152B" />
              <rect x="28" y="34" width="3" height="2" fill="#DF7B9D" />
            </g>

            {/* --- CHEEK BLUSH (Rosy Pink) --- */}
            <rect x="15" y="23" width="4" height="2" fill="#EF6C96" opacity="0.85" />
            <rect x="29" y="23" width="4" height="2" fill="#EF6C96" opacity="0.85" />

            {/* --- EYES & EXPRESSIONS --- */}
            {state === 'idle' && (
              <g id="exp-idle">
                {blink ? (
                  // Blinking eyes
                  <>
                    <rect x="18" y="22" width="4" height="1" fill="#33101F" />
                    <rect x="26" y="22" width="4" height="1" fill="#33101F" />
                  </>
                ) : (
                  // Normal Cute Open Eyes
                  <>
                    {/* Left Eye */}
                    <rect x="18" y="20" width="3" height="4" fill="#33101F" />
                    <rect x="18" y="20" width="1" height="1" fill="#FFFFFF" />
                    {/* Right Eye */}
                    <rect x="27" y="20" width="3" height="4" fill="#33101F" />
                    <rect x="27" y="20" width="1" height="1" fill="#FFFFFF" />
                  </>
                )}
                {/* W Mouth */}
                <rect x="22" y="24" width="1" height="1" fill="#33101F" />
                <rect x="23" y="25" width="2" height="1" fill="#33101F" />
                <rect x="25" y="24" width="1" height="1" fill="#33101F" />
              </g>
            )}

            {state === 'eating' && (
              <g id="exp-eating">
                {/* Happy Closed Eyes (^ ^) */}
                <rect x="18" y="20" width="4" height="1" fill="#33101F" />
                <rect x="17" y="21" width="1" height="1" fill="#33101F" />
                <rect x="21" y="21" width="1" height="1" fill="#33101F" />

                <rect x="26" y="20" width="4" height="1" fill="#33101F" />
                <rect x="25" y="21" width="1" height="1" fill="#33101F" />
                <rect x="29" y="21" width="1" height="1" fill="#33101F" />

                {/* Open Chewing Mouth */}
                <rect x="22" y="23" width="4" height="3" fill="#33101F" />
                <rect x="23" y="24" width="2" height="2" fill="#D94562" />

                {/* Mochi Crumb Particles */}
                <rect x="14" y="25" width="1" height="1" fill="#F4E2B6" />
                <rect x="13" y="27" width="2" height="1" fill="#E6C587" />
                <rect x="33" y="26" width="1" height="2" fill="#F4E2B6" />
              </g>
            )}

            {state === 'sleeping' && (
              <g id="exp-sleeping">
                {/* Peaceful Closed Eyes (- -) */}
                <rect x="18" y="21" width="4" height="1" fill="#33101F" />
                <rect x="26" y="21" width="4" height="1" fill="#33101F" />
                {/* Cute Sleeping Mouth (o) */}
                <rect x="23" y="24" width="2" height="1" fill="#33101F" />

                {/* Floating Zzz Animated Particles */}
                <g className="anim-zzz1">
                  <text x="32" y="16" fill="#8B5CF6" fontSize="6" fontWeight="bold" fontFamily="monospace">Z</text>
                </g>
                <g className="anim-zzz2">
                  <text x="36" y="12" fill="#A78BFA" fontSize="8" fontWeight="bold" fontFamily="monospace">Z</text>
                </g>
              </g>
            )}

            {state === 'sad' && (
              <g id="exp-sad">
                {/* Open Sad Eyes (Wide Open Eyes with Tear) */}
                <rect x="18" y="20" width="3" height="4" fill="#33101F" />
                <rect x="18" y="20" width="1" height="1" fill="#FFFFFF" />

                <rect x="27" y="20" width="3" height="4" fill="#33101F" />
                <rect x="27" y="20" width="1" height="1" fill="#FFFFFF" />

                {/* Downward Sad Mouth */}
                <rect x="23" y="24" width="2" height="1" fill="#33101F" />
                <rect x="22" y="25" width="1" height="1" fill="#33101F" />
                <rect x="25" y="25" width="1" height="1" fill="#33101F" />

                {/* Pixel Teardrop under left eye */}
                <rect x="17" y="23" width="2" height="3" fill="#64B5F6" />
                <rect x="17" y="23" width="1" height="1" fill="#FFFFFF" />
              </g>
            )}

            {state === 'play' && (
              <g id="exp-play">
                {/* Twinkling Big Eyes */}
                <rect x="17" y="19" width="4" height="4" fill="#33101F" />
                <rect x="17" y="19" width="2" height="2" fill="#FFFFFF" />
                <rect x="20" y="21" width="1" height="1" fill="#FFFFFF" />

                <rect x="27" y="19" width="4" height="4" fill="#33101F" />
                <rect x="27" y="19" width="2" height="2" fill="#FFFFFF" />
                <rect x="30" y="21" width="1" height="1" fill="#FFFFFF" />

                {/* Wide Happy Mouth */}
                <rect x="22" y="24" width="4" height="3" fill="#33101F" />
                <rect x="23" y="25" width="2" height="2" fill="#FF477E" />

                {/* Sparkle Stars around body */}
                <g className="anim-sparkle1">
                  <polygon points="8,12 9,14 11,14 9,15 10,17 8,16 6,17 7,15 5,14 7,14" fill="#FFD166" />
                </g>
                <g className="anim-sparkle2">
                  <polygon points="40,10 41,12 43,12 41,13 42,15 40,14 38,15 39,13 37,12 39,12" fill="#FFD166" />
                </g>
                <g className="anim-sparkle3">
                  <polygon points="38,30 39,32 41,32 39,33 40,35 38,34 36,35 37,33 35,32 37,32" fill="#FFFFFF" />
                </g>
              </g>
            )}

            {/* ====================================================================== */}
            {/* LAYER 3: OUTFIT (Layered on body)                                     */}
            {/* ====================================================================== */}
            {outfit !== 'none' && (
              <g id="layer-outfit">
                {outfit === 'strawberry_apron' && (
                  <g id="outfit-strawberry-apron">
                    {/* Red Apron Body */}
                    <rect x="16" y="26" width="16" height="8" fill="#E63946" />
                    <rect x="18" y="24" width="12" height="2" fill="#E63946" />
                    {/* White Seeds / Dots */}
                    <rect x="18" y="27" width="1" height="1" fill="#FFFFFF" />
                    <rect x="22" y="29" width="1" height="1" fill="#FFFFFF" />
                    <rect x="26" y="27" width="1" height="1" fill="#FFFFFF" />
                    <rect x="29" y="30" width="1" height="1" fill="#FFFFFF" />
                    {/* Green Straps & Bow */}
                    <rect x="17" y="22" width="2" height="4" fill="#40916C" />
                    <rect x="29" y="22" width="2" height="4" fill="#40916C" />
                    {/* White Frill Trim */}
                    <rect x="16" y="34" width="16" height="1" fill="#FFFDF5" />
                  </g>
                )}

                {outfit === 'cozy_sweater' && (
                  <g id="outfit-cozy-sweater">
                    {/* Pastel Yellow Sweater */}
                    <rect x="15" y="24" width="18" height="10" fill="#F4D35E" />
                    {/* Lavender Stripes */}
                    <rect x="15" y="26" width="18" height="2" fill="#B8C0FF" />
                    <rect x="15" y="30" width="18" height="2" fill="#B8C0FF" />
                    {/* Sweater Collar */}
                    <rect x="20" y="23" width="8" height="2" fill="#EE9B00" />
                  </g>
                )}

                {outfit === 'party_dress' && (
                  <g id="outfit-party-dress">
                    {/* Purple Frilly Dress */}
                    <rect x="15" y="25" width="18" height="9" fill="#9B5DE5" />
                    {/* Gold Ribbon Belt */}
                    <rect x="15" y="27" width="18" height="2" fill="#FEE440" />
                    <rect x="23" y="27" width="2" height="3" fill="#FEE440" />
                    {/* Bottom Frills */}
                    <rect x="14" y="33" width="20" height="2" fill="#C77DFF" />
                  </g>
                )}

                {outfit === 'witch_robe' && (
                  <g id="outfit-witch-robe">
                    {/* Midnight Purple Robe */}
                    <rect x="15" y="24" width="18" height="10" fill="#3C096C" />
                    {/* Orange Belt */}
                    <rect x="15" y="28" width="18" height="2" fill="#F77F00" />
                    <rect x="23" y="27" width="2" height="4" fill="#FFD166" />
                  </g>
                )}

                {outfit === 'angel_robe' && (
                  <g id="outfit-angel-robe">
                    {/* White Robe */}
                    <rect x="15" y="24" width="18" height="10" fill="#FFFFFF" />
                    {/* Gold Trim */}
                    <rect x="15" y="33" width="18" height="1" fill="#FFD166" />
                    <rect x="20" y="24" width="8" height="2" fill="#E0F7FA" />
                  </g>
                )}

                {outfit === 'sakura_kimono' && (
                  <g id="outfit-sakura-kimono">
                    {/* Soft Sakura Pink Kimono */}
                    <rect x="15" y="24" width="18" height="10" fill="#FFB7C5" />
                    {/* White Obi Belt */}
                    <rect x="15" y="27" width="18" height="3" fill="#FFFFFF" />
                    <rect x="22" y="27" width="4" height="3" fill="#E63946" />
                  </g>
                )}
              </g>
            )}

            {/* ====================================================================== */}
            {/* LAYER 4: ACCESSORY (Layered on head)                                 */}
            {/* ====================================================================== */}
            {accessory !== 'none' && (
              <g id="layer-accessory">
                {accessory === 'pink_ribbon' && (
                  <g id="acc-pink-ribbon">
                    {/* Cute Red/Pink Bow on Left Ear */}
                    <rect x="10" y="10" width="7" height="5" fill="#FF4D6D" />
                    <rect x="12" y="11" width="3" height="3" fill="#C9184A" />
                    <rect x="13" y="12" width="1" height="1" fill="#FFB3C1" />
                  </g>
                )}

                {accessory === 'flower_pin' && (
                  <g id="acc-flower-pin">
                    {/* Daisy Flower Pin on Right Ear */}
                    <rect x="31" y="9" width="5" height="5" fill="#FFFFFF" />
                    <rect x="33" y="11" width="1" height="1" fill="#FFD166" />
                  </g>
                )}

                {accessory === 'round_glasses' && (
                  <g id="acc-round-glasses">
                    {/* Left Frame */}
                    <rect x="16" y="19" width="6" height="5" fill="#222222" />
                    <rect x="17" y="20" width="4" height="3" fill="#E0F7FA" opacity="0.6" />
                    {/* Right Frame */}
                    <rect x="26" y="19" width="6" height="5" fill="#222222" />
                    <rect x="27" y="20" width="4" height="3" fill="#E0F7FA" opacity="0.6" />
                    {/* Middle Bridge */}
                    <rect x="22" y="21" width="4" height="1" fill="#222222" />
                  </g>
                )}

                {accessory === 'halo' && (
                  <g id="acc-halo">
                    {/* Glowing Golden Pixel Ring */}
                    <rect x="16" y="6" width="16" height="3" fill="#FFD700" />
                    <rect x="18" y="7" width="12" height="1" fill="#FFF59D" />
                  </g>
                )}

                {accessory === 'headset' && (
                  <g id="acc-headset">
                    {/* Headband */}
                    <rect x="14" y="8" width="20" height="2" fill="#3D5A80" />
                    {/* Ear Cups */}
                    <rect x="10" y="15" width="4" height="8" fill="#3D5A80" />
                    <rect x="11" y="16" width="2" height="6" fill="#98C1D9" />
                    <rect x="34" y="15" width="4" height="8" fill="#3D5A80" />
                    <rect x="35" y="16" width="2" height="6" fill="#98C1D9" />
                  </g>
                )}

                {accessory === 'crown' && (
                  <g id="acc-crown">
                    {/* Golden Royal Crown */}
                    <rect x="18" y="8" width="12" height="6" fill="#FFB703" />
                    <rect x="18" y="8" width="2" height="3" fill="#FFD166" />
                    <rect x="23" y="8" width="2" height="3" fill="#FFD166" />
                    <rect x="28" y="8" width="2" height="3" fill="#FFD166" />
                    {/* Red Ruby Gem */}
                    <rect x="23" y="11" width="2" height="2" fill="#E63946" />
                  </g>
                )}
              </g>
            )}

            {/* ====================================================================== */}
            {/* LAYER 5: DIRT LAYER (Rendered if isDirty === true)                   */}
            {/* ====================================================================== */}
            {isDirty && (
              <g id="layer-dirt">
                {/* Gray-Brown Pixel Dirt Spots */}
                <rect x="16" y="18" width="3" height="2" fill="#7F5539" opacity="0.85" />
                <rect x="29" y="27" width="4" height="3" fill="#7F5539" opacity="0.85" />
                <rect x="21" y="31" width="3" height="2" fill="#9C6644" opacity="0.8" />
                <rect x="31" y="18" width="2" height="2" fill="#9C6644" opacity="0.8" />

                {/* Animated Buzzing Fly */}
                <g className="anim-fly">
                  <rect x="10" y="8" width="2" height="2" fill="#2B2B2B" />
                  <rect x="9" y="7" width="1" height="1" fill="#BEE9E8" />
                  <rect x="12" y="7" width="1" height="1" fill="#BEE9E8" />
                </g>
              </g>
            )}

            {/* ====================================================================== */}
            {/* LAYER 6: SOAP BUBBLES (Rendered if isSoapy === true)                 */}
            {/* ====================================================================== */}
            {isSoapy && (
              <g id="layer-soapy" className="anim-bubble">
                {/* Shiny White Soap Bubbles */}
                <rect x="13" y="8" width="6" height="5" fill="#FFFFFF" rx="1" />
                <rect x="14" y="9" width="2" height="2" fill="#D8F3DC" />

                <rect x="28" y="7" width="7" height="6" fill="#FFFFFF" rx="1" />
                <rect x="29" y="8" width="3" height="2" fill="#BEE9E8" />

                <rect x="19" y="12" width="5" height="4" fill="#FFFFFF" rx="1" />

                {/* Tummy Soap Bubbles */}
                <rect x="16" y="28" width="5" height="4" fill="#FFFFFF" rx="1" />
                <rect x="27" y="29" width="6" height="4" fill="#FFFFFF" rx="1" />
              </g>
            )}
          </g>

          {/* ====================================================================== */}
          {/* LAYER 7: BED BLANKET (Layered on top of Pompom lower body)            */}
          {/* ====================================================================== */}
          {isSleepingInBed && (
            <g id="layer-bed-blanket">
              {/* Cozy Pastel Blanket covering lower body */}
              <rect x="6" y="26" width="36" height="14" fill="#A0C4FF" />
              {/* Folded Blanket Rim */}
              <rect x="6" y="26" width="36" height="3" fill="#FFFFFF" />
              <rect x="6" y="29" width="36" height="1" fill="#BDB2FF" />
              {/* Blanket Pattern / Stripe */}
              <rect x="6" y="34" width="36" height="2" fill="#FFC6FF" opacity="0.6" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export default PompomPixel;
