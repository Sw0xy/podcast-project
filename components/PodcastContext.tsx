/* eslint-disable @next/next/no-img-element */
import {
  createContext,
  ReactElement,
  useContext,
  useState,
  useEffect,
  useRef,
  RefObject,
} from "react";
import { Episode } from "../types";
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaVolumeDown,
  FaVolumeMute,
  FaVolumeOff,
  FaVolumeUp,
} from "react-icons/fa";
import { Range } from "react-range";
import moment from "moment";

interface PlayerContext {
  playEpisode: (episode: Episode) => void;
  currentEpisode?: Episode;
}

const PlayerContext = createContext({
  currentEpisode: undefined,
  playEpisode: () => null,
} as PlayerContext);

export function usePlayer() {
  return useContext(PlayerContext);
}

const PodcastContext = ({ children }: { children: ReactElement[] }) => {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode>();
  const [volume, setVolume] = useState([1]);

  function playEpisode(episode: Episode) {
    setCurrentEpisode(episode);
  }

  useEffect(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.onvolumechange = (e) => {
        setVolume([
          (e.target as HTMLAudioElement).muted
            ? 0
            : (e.target as HTMLAudioElement).volume,
        ]);
      };
    }
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        currentEpisode,
        playEpisode,
      }}
    >
      <div className="">
        {children}
        {currentEpisode && (
          <div>
            <div className="min-h-[80px] w-full fixed bottom-0 z-40 bg-secondary p-3 flex items-center justify-between border-t border-border">
              <div className="flex items-center gap-x-3 max-w-sm w-full md:ml-8">
                <img
                  src={currentEpisode.feedImage}
                  alt="pp"
                  className="w-20 h-20 rounded-md"
                />
                <div className="max-w-xs h-full">
                  <h4 className="text-light_text text-sm font-semibold mb-2">
                    {currentEpisode.title.length > 60
                      ? currentEpisode.title.slice(0, 60) + "..."
                      : currentEpisode.title}
                  </h4>
                  <span className="font-medium text-sm uppercase text-text p-1 border border-border rounded-md">
                    {currentEpisode.feedLanguage}
                  </span>
                </div>
              </div>
              <AudioComponent
                audioPlayerRef={audioPlayerRef}
                duration={currentEpisode.duration}
                id={currentEpisode.id}
                src={currentEpisode.enclosureUrl}
                type={currentEpisode.enclosureType}
                autoplay={false}
              />
              <div className="text-text max-w-sm w-full justify-center flex items-center p-4 gap-x-6">
                <button
                  className="hidden hover:text-white sm:block"
                  onClick={() => {
                    if (audioPlayerRef.current) {
                      audioPlayerRef.current.muted =
                        !audioPlayerRef.current.muted;
                    }
                  }}
                >
                  {volume[0] === 0 ? (
                    <FaVolumeMute size={20} className="pointer-events-none" />
                  ) : volume[0] < 0.33 ? (
                    <FaVolumeOff size={20} className="pointer-events-none" />
                  ) : volume[0] < 0.66 ? (
                    <FaVolumeDown size={20} className="pointer-events-none" />
                  ) : (
                    <FaVolumeUp size={20} className="pointer-events-none" />
                  )}
                </button>
                <Range
                  step={0.01}
                  min={0}
                  max={1}
                  values={volume}
                  onChange={(vol) => {
                    if (audioPlayerRef.current) {
                      audioPlayerRef.current.volume = vol[0];
                      setVolume(vol);
                    }
                  }}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "5px",
                        width: "200px",
                        borderRadius: "12px",
                        backgroundColor: "#ccc",
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "16px",
                        width: "16px",
                        backgroundColor: "#fff",
                        borderRadius: "100%",
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </PlayerContext.Provider>
  );
};

export default PodcastContext;

interface AudioComponentProps {
  id: string | number;
  duration: number;
  type: string;
  src: string;
  audioPlayerRef: RefObject<HTMLAudioElement>;
  autoplay?: boolean;
}
const AudioComponent = ({
  duration,
  autoplay,
  type,
  src,
  audioPlayerRef,
  id,
}: AudioComponentProps) => {
  const [totalTime, setTotalTime] = useState(duration);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.onplay = () => setPlaying(true);
      audioPlayerRef.current.onpause = () => setPlaying(false);
    }
  }, [audioPlayerRef]);

  return (
    <div className="w-full flex items-center flex-col justify-center gap-2">
      <audio
        controls={false}
        autoPlay={true}
        preload="auto"
        ref={audioPlayerRef}
        src={src}
        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime);
          setTotalTime(e.currentTarget.duration);
        }}
      >
        <source src={src} type={type} />
      </audio>
      <div className="flex items-center text-text gap-x-4">
        <button
          className="hover:text-black dark:hover:text-white"
          onClick={() => {
            if (audioPlayerRef.current) {
              if (audioPlayerRef.current.currentTime > 5) {
                audioPlayerRef.current.currentTime -= 5;
              } else {
                audioPlayerRef.current.currentTime = 0;
              }
            }
          }}
        >
          <FaBackward size={16} className="pointer-events-none" />
        </button>

        <button
          onClick={() => {
            if (audioPlayerRef.current) {
              audioPlayerRef.current.paused
                ? setPlaying(true)
                : setPlaying(false);
              audioPlayerRef.current.paused
                ? audioPlayerRef.current.play()
                : audioPlayerRef.current.pause();
            }
          }}
          className="grid scale-95 place-content-center rounded-full bg-white p-2 drop-shadow hover:scale-100 hover:text-black dark:bg-gray-800 dark:hover:text-white"
        >
          {playing ? (
            <FaPause size={24} className="pointer-events-none" />
          ) : (
            <FaPlay size={24} className="pointer-events-none translate-x-0.5" />
          )}
        </button>

        <button
          className="hover:text-black dark:hover:text-white"
          onClick={() => {
            if (audioPlayerRef.current) {
              if (
                audioPlayerRef.current.duration -
                  audioPlayerRef.current.currentTime <
                5
              ) {
                audioPlayerRef.current.currentTime =
                  audioPlayerRef.current.duration;
              } else {
                audioPlayerRef.current.currentTime += 5;
              }
            }
          }}
        >
          <FaForward size={16} className="pointer-events-none" />
        </button>
      </div>
      <div className="w-full flex items-center gap-3 text-text font-medium">
        <span>{moment.unix(currentTime).utc().format("mm:ss")}</span>
        <Range
          step={0.01}
          min={0}
          max={totalTime}
          values={[currentTime]}
          onChange={(vol) => {
            if (audioPlayerRef.current) {
              audioPlayerRef.current.currentTime = vol[0];
            }
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "5px",
                width: "100%",
                borderRadius: "12px",
                backgroundColor: "#272832",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "14px",
                width: "14px",
                backgroundColor: "#F8F8F8",
                borderRadius: "100%",
              }}
            />
          )}
        />
        <span>{moment.unix(duration).utc().format("mm:ss")}</span>
      </div>
    </div>
  );
};
