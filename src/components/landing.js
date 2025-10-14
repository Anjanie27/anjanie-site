import Image from "next/image";
import { Button } from "@/components/buttons";

export function Landing() {
  return (
    <div className="relative flex flex-row bg-skyblue h-[100vh] overflow-hidden">
      {/* Left panel */}
      <div className="bg-jordyblue w-[40vw] flex items-center justify-center text-white text-xl">
      </div>

      {/* Right panel */}
      <div className="py-10 px-[15vw] gap-4 flex flex-col justify-center bg-background w-[60vw] relative z-10">
        <h1 className="text-6xl font-bold">Hello</h1>
        <h3 className="text-xl">
          I'm Anjanie Sukhnandan, and this is who I am :)
        </h3>
        <div className="gap-4 flex flex-row">
          <Button title="Resume" />
          <Button title="Projects" />
        </div>
        <p>
          greeen grapes with more green grapes and some more green grapes and if
          you really love me then i will get green grapes. do you know that i
          like green grapes? thats what im all about! green grapes!
        </p>
      </div>

      {/* Photo rectangle overlapping both panels */}
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[40vw] h-[60vh] bg-skyblue rounded-2xl shadow-lg overflow-hidden border-4 border-white z-100 max-w-[650px]">
        <Image
          src="/images/profile.png"
          alt="Profile photo"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
