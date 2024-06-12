'use client'
import { Metadata } from "next"
import Image from "next/image"
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import { Textarea } from "@/components/ui/textarea"

import { CodeViewer } from "./components/code-viewer"
import { MaxLengthSelector } from "./components/maxlength-selector"
import { ModelSelector } from "./components/model-selector"
import { PresetActions } from "./components/preset-actions"
import { PresetSave } from "./components/preset-save"
import { PresetSelector } from "./components/preset-selector"
import { PresetShare } from "./components/preset-share"
import { TemperatureSelector } from "./components/temperature-selector"
import { TopPSelector } from "./components/top-p-selector"
import { types, ovenDropDownOptions, ModelType } from "./data/models"
import { presets } from "./data/presets"
import FileUpload from "./components/file-upload"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import VizualizeOven from "@/components/vizualize-oven"

interface TemperatureData {
  air_temp_name: string[];
  reference_name: string;
  reference_thickness: number;
  substrate_target_name: string;
  substrate_target_thickness: number;
  line_speed: number;
}

export default function PlaygroundPage() {
  const [step, setStep] = useState(0);
  const [extractedOptions, setExtractedOptions] = useState(null);
  const [airTempNames, setAirTempNames] = useState<ModelType[]>([]);
  const [referenceName, setReferenceName] = useState<ModelType[]>([]);
  const [lineSpeed, setLineSpeed] = useState("");



  const handleSubmitClick = async () => {
    const data: TemperatureData = {
      air_temp_name: [''],
      reference_name: '',
      reference_thickness: 0.2,
      substrate_target_name: '',
      substrate_target_thickness: 0.4,
      line_speed: parseFloat(lineSpeed),
    };

    try {
      const response = await fetch('http://localhost:8000/generate_output', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('File upload error:', error);
    }

  };

console.log(extractedOptions);
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/playground-light.png"
          width={1280}
          height={916}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/playground-dark.png"
          width={1280}
          height={916}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Playground</h2>
          {/* <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector presets={presets} />
            <PresetSave />
            <div className="hidden space-x-2 md:flex">
              <CodeViewer />
              <PresetShare />
            </div>
          
          </div> */}
          <PresetActions />
        </div>
        <Separator />

        <div className="container h-full py-6">
          <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
            <div className="hidden flex-col space-y-4 sm:flex md:order-2">
              <div className="grid gap-2">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <span className="text-m font-semibold mb-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Parameters
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[320px] text-sm" side="left">
                    Its a three step process to generate oven temperature profiles.
                  </HoverCardContent>
                </HoverCard>


              </div>

              <Label htmlFor="input0">Heat capacity</Label>
              <Input placeholder="0.56" id="input0" />

              <Label htmlFor="input1">Density</Label>
              <Input placeholder="0.56" id="input1" />

              <Label htmlFor="input2">Line Speed</Label>
              <Input placeholder="0.56" id="input2"
                value={lineSpeed}
                onChange={e => setLineSpeed(e.target.value)}
              />

              <TemperatureSelector defaultValue={[0.56]} />
              <MaxLengthSelector defaultValue={[256]} />


              {/* <TopPSelector defaultValue={[0.9]} /> */}
            </div>
            <div className="md:order-1">

            {step == 0 && (<FileUpload
                step={step}
                setStep={setStep}
                setExtractedOptions={setExtractedOptions}

              />)}



              {/* <TabsContent value="insert" className="mt-0 border-0 p-0"> */}

              {/* step 2 */}


              {/* <div className="flex flex-col space-y-4">
                    <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                      <Textarea
                        placeholder="We're writing to [inset]. Congrats from OpenAI!"
                        className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                      />
                      <div className="rounded-md border bg-muted"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button>Submit</Button>
                      <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div> */}
              {/* </TabsContent> */}

           {step == 1 && (   <div className="flex flex-col space-y-4">
                Oven image
                <VizualizeOven

                />



                {extractedOptions && (<div className="flex flex-col space-y-4">
                  <ModelSelector
                    types={types}
                    models={extractedOptions}
                    name={"Temprature"}
                    setSelected={setAirTempNames}
                  />
                  <ModelSelector types={types} models={extractedOptions} name={"Reference"}
                    setSelected={setReferenceName}
                  />

         

                  {/* <Button size="lg"
                    onClick={handleSubmitClick}
                  >
                    Upload
                  </Button> */}
                </div>)}

                <div className="flex items-center space-x-2">
                  <Button
                        onClick={handleSubmitClick}
                  >Submit</Button>
                  <Button variant="secondary">
                    <span className="sr-only">Show history</span>
                    <CounterClockwiseClockIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>)}

            </div>
          </div>
        </div>

      </div>
    </>
  )
}
