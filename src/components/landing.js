import {Button} from "@/components/buttons"
export function Landing() {
  return (
    <div className="flex flex-row bg-skyblue h-[100vh]">
        <div className="bg-jordyblue w-[40vw]">
            grapes with green
        </div>
        <div className="p-10 gap-4 flex flex-col justify-center bg-background w-[60vw]">
            <h1 className="text-6xl font-bold">
                Hello
            </h1>
            <h3 className="text-2xl">
                I'm Anjanie Sukhnandan, and this is who I am :)
            </h3>
            <div className="gap-4 flex flex-row"> 
                <Button title="Resume"/>
                <Button title="Projects"/>
            </div>
            <p>
                greeen grapes with more green grapes and some more green grapes and if you really love me then i will get green grapes. do you know that i like green grapes? thats what im all about! green grapes!
            </p>
        </div>
    </div>
  );
}
