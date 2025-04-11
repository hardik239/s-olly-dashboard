import { FC } from "react";

const NoTableData: FC<{ content?: string }> = ({
  content = "No data found",
}) => {
  return (
    <div className="w-full h-full pt-20 flex items-center flex-col justify-center">
      <svg
        width="320"
        height="192"
        viewBox="0 0 320 192"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.4">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M225.875 72.6187V143.292C225.875 143.953 225.522 144.563 224.949 144.893L165.469 179.107L165.47 179.107L165.424 179.132L165.07 179.336C165.018 179.366 164.965 179.39 164.912 179.409C164.109 179.806 163.16 179.79 162.367 179.362L161.896 179.107L163.686 178.444V108.398L225.875 72.6187Z"
            fill="#737988"
          />
          <g opacity="0.4">
            <mask
              id="mask0"
              mask-type="alpha"
              maskUnits="userSpaceOnUse"
              x="161"
              y="72"
              width="65"
              height="108"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M225.875 72.6187V143.292C225.875 143.953 225.522 144.563 224.949 144.893L165.469 179.107L165.47 179.107L165.424 179.132L165.07 179.336C165.018 179.366 164.965 179.39 164.912 179.409C164.109 179.806 163.16 179.79 162.367 179.362L161.896 179.107L163.686 178.444V108.398L225.875 72.6187Z"
                fill="#34343A"
              />
            </mask>
            <g mask="url(#mask0)">
              <g filter="url(#filter0_f)">
                <path
                  d="M194.107 130.256L166.924 114.636V92.0226L229.11 78.8564L254.012 93.3107C256.671 94.854 256.668 98.6949 254.006 100.233L202.089 130.242C199.618 131.67 196.581 131.678 194.107 130.256Z"
                  fill="black"
                />
              </g>
            </g>
          </g>
          <path
            d="M101.474 143.274V72.6074L163.684 108.4V178.537C163.684 179.247 162.916 179.691 162.3 179.337L102.399 144.874C101.827 144.544 101.474 143.934 101.474 143.274Z"
            fill="#888888"
          />
          <g opacity="0.2">
            <mask
              id="mask1"
              mask-type="alpha"
              maskUnits="userSpaceOnUse"
              x="101"
              y="72"
              width="63"
              height="108"
            >
              <path
                d="M101.474 143.274V72.6074L163.684 108.4V178.537C163.684 179.247 162.916 179.691 162.3 179.337L102.399 144.874C101.827 144.544 101.474 143.934 101.474 143.274Z"
                fill="#40404A"
              />
            </mask>
            <g mask="url(#mask1)">
              <g filter="url(#filter1_f)">
                <path
                  d="M106.323 96.3063L131.471 81.8315L193.687 96.833V117.635L166.503 133.274C164.033 134.695 160.995 134.696 158.525 133.275C148.842 127.703 123.618 113.189 106.319 103.237C103.645 101.699 103.65 97.845 106.323 96.3063Z"
                  fill="black"
                />
              </g>
            </g>
          </g>
          <path
            d="M225.873 72.6184L163.683 36.8525L163.684 108.371V108.398L225.873 72.6184Z"
            fill="#817D91"
          />
          <path
            opacity="0.4"
            d="M225.873 72.6184L163.683 36.8525L163.684 108.371V108.398L225.873 72.6184Z"
            fill="url(#paint0_linear)"
          />
          <path
            opacity="0.4"
            d="M225.873 72.6184L163.683 36.8525L163.684 108.371V108.398L225.873 72.6184Z"
            fill="url(#paint1_linear)"
          />
          <path
            d="M163.683 108.398V36.8525L101.474 72.6062L163.683 108.398Z"
            fill="#6C6D78"
          />
          <path
            opacity="0.4"
            d="M163.683 108.398V36.8525L101.474 72.6062L163.683 108.398Z"
            fill="url(#paint2_linear)"
          />
          <path
            opacity="0.4"
            d="M163.683 108.398V36.8525L101.474 72.6062L163.683 108.398Z"
            fill="url(#paint3_linear)"
          />
          <path
            d="M163.688 36.8504L186.424 17.4942C186.796 17.1774 187.191 16.8466 187.676 16.7861C188.069 16.7372 188.475 16.8152 188.829 17.02L248.948 50.9819C249.456 51.3652 249.357 52.1663 248.946 52.5814L225.872 72.6192L163.688 36.8504Z"
            fill="#C2C2D6"
          />
          <path
            d="M71.6866 89.7425L101.469 72.6001L163.685 108.404L133.431 125.808C132.861 126.136 132.178 126.146 131.608 125.818C125.589 122.355 90.9247 102.409 71.6746 91.3357C71.0575 90.9808 71.0696 90.0976 71.6866 89.7425Z"
            fill="#C2C2D6"
          />
          <path
            d="M163.659 108.42L225.87 72.6099L253.024 85.7653C253.637 86.1214 253.637 87.0078 253.022 87.3629L193.743 121.853C193.247 122.142 192.723 122.451 192.15 122.422C191.774 122.403 191.473 122.259 191.125 122.059L163.659 108.42Z"
            fill="#C2C2D6"
          />
          <path
            d="M163.659 108.42L225.87 72.6099L253.024 85.7653C253.637 86.1214 253.637 87.0078 253.022 87.3629L193.743 121.853C193.247 122.142 192.723 122.451 192.15 122.422C191.774 122.403 191.473 122.259 191.125 122.059L163.659 108.42Z"
            fill="url(#paint4_linear)"
          />
          <path
            d="M77.7974 50.7508L138.828 16.2049C139.15 16.0197 139.514 15.9391 139.872 15.9631C140.429 16.0004 140.879 16.3929 141.294 16.7659L163.685 36.8541L101.465 72.6051C101.465 72.6051 88.1054 61.5814 78.1034 52.6272C77.8948 52.4404 77.6414 52.2966 77.4854 52.0642C77.2036 51.6443 77.3096 51.0314 77.7974 50.7508Z"
            fill="#C2C2D6"
          />
          <path
            opacity="0.4"
            d="M77.7974 50.7508L138.828 16.2049C139.15 16.0197 139.514 15.9391 139.872 15.9631C140.429 16.0004 140.879 16.3929 141.294 16.7659L163.685 36.8541L101.465 72.6051C101.465 72.6051 88.1054 61.5814 78.1034 52.6272C77.8948 52.4404 77.6414 52.2966 77.4854 52.0642C77.2036 51.6443 77.3096 51.0314 77.7974 50.7508Z"
            fill="url(#paint5_linear)"
          />
          <path
            opacity="0.8"
            d="M77.7974 50.7508L138.828 16.2049C139.15 16.0197 139.514 15.9391 139.872 15.9631C140.429 16.0004 140.879 16.3929 141.294 16.7659L163.685 36.8541L101.465 72.6051C101.465 72.6051 88.1054 61.5814 78.1034 52.6272C77.8948 52.4404 77.6414 52.2966 77.4854 52.0642C77.2036 51.6443 77.3096 51.0314 77.7974 50.7508Z"
            fill="url(#paint6_linear)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f"
            x="118.924"
            y="30.8564"
            width="185.08"
            height="148.461"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur stdDeviation="24" result="effect1_foregroundBlur" />
          </filter>
          <filter
            id="filter1_f"
            x="84.3159"
            y="61.8315"
            width="129.371"
            height="92.5087"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur" />
          </filter>
          <linearGradient
            id="paint0_linear"
            x1="211.025"
            y1="67.0102"
            x2="185.729"
            y2="122.494"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopOpacity="0" />
            <stop offset="1" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="189.767"
            y1="85.2922"
            x2="183.399"
            y2="125.259"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopOpacity="0" />
            <stop offset="1" />
          </linearGradient>
          <linearGradient
            id="paint2_linear"
            x1="114.089"
            y1="79.3399"
            x2="140.449"
            y2="119.305"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopOpacity="0" />
            <stop offset="1" />
          </linearGradient>
          <linearGradient
            id="paint3_linear"
            x1="132.578"
            y1="95.0709"
            x2="145.126"
            y2="124.407"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopOpacity="0" />
            <stop offset="1" />
          </linearGradient>
          <linearGradient
            id="paint4_linear"
            x1="147.06"
            y1="44.64"
            x2="185.261"
            y2="106.254"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint5_linear"
            x1="107.425"
            y1="85.8923"
            x2="98.2047"
            y2="69.766"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint6_linear"
            x1="68.5499"
            y1="-7.08234"
            x2="100.945"
            y2="48.4997"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <h2 className="text-center text-gray-700 text-xl font-semibold leading-loose pb-10">
        {content}
      </h2>
    </div>
  );
};

export default NoTableData;
