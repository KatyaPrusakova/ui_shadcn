"use client";

import { Step, type StepItem, Stepper } from "@/components/stepper";
import { StepperContext } from "@/components/stepper/context";
import { useStepper } from "@/components/stepper/use-stepper";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import FileUpload from "../playground/components/file-upload";


const steps = [
	{ label: "Step 1" },
	{ label: "Step 2" },
	{ label: "Step 3" },
] satisfies StepItem[];

export default function StepperDemo() {
	return (
		<div className="flex w-full flex-col gap-4">
			<Stepper initialStep={0} steps={steps}>
				{steps.map((stepProps, index) => {
					return (
						<Step key={stepProps.label} {...stepProps}>

						
							<div className="h-40 flex items-center justify-center mt-20  text-primary rounded-md">
							{index === 0 && (
								    <FileUpload
									// step={index}
									// setStep={setStep}
									// setExtractedOptions={setExtractedOptions}
				
								  />
							)}

							{index === 1 && (
								    <FileUpload
									// step={index}
									// setStep={setStep}
									// setExtractedOptions={setExtractedOptions}
				
								  />
							)}
							</div>
						</Step>
					);
				})}
				<Footer />
			</Stepper>
		</div>
	);
}

const Footer = () => {
	const {
		nextStep,
		prevStep,
		resetSteps,
		hasCompletedAllSteps,
		isLastStep,
		isOptionalStep,
		isDisabledStep } = useStepper();
	return (
		<>
			{hasCompletedAllSteps && (
				<div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
					<h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
				</div>
			)}
			<div className="w-full flex justify-end gap-2">
				{hasCompletedAllSteps ? (
					<Button size="sm" onClick={resetSteps}>
						Reset
					</Button>
				) : (
					<>
						<Button
							disabled={isDisabledStep}
							onClick={prevStep}
							size="sm"
							variant="secondary"
						>
							Prev
						</Button>
						<Button size="sm" onClick={nextStep}>
							{isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
						</Button>
					</>
				)}
			</div>
		</>
	);
};
