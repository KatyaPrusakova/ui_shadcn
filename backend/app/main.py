from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel



from app.oven_function import OvenFunction


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


oven_function = OvenFunction()

@app.get("/")
def read_root():
    return {"Hello": "World"}


class TemperatureData(BaseModel):
    air_temp_name: List[str] = []
    reference_name: str
    reference_thickness: float
    target_name: str
    target_thickness: float
    line_speed: float
    oven_delta_temp: Optional[float] = None
    prediction_thickness: Optional[float] = None

@app.post("/generate_output")
def get_generate_image(data: TemperatureData):
    try:
        oven_function = OvenFunction()

        print("data: ", data)
        oven_function.set_air_name(data.air_temp_name)

        oven_function.set_reference_part_spec(data.reference_name, data.reference_thickness)
        oven_function.set_reference_heat_capacity_and_density(450, 7870)
        oven_function.set_target_heat_capacity_and_density(450, 7870)

        oven_function.generate_data_dict()
        oven_function.verify_predict_part_temp(data.target_name, data.target_thickness)

        oven_function.plot_results(['T_part_target', data.target_name, data.reference_name, 'air_temp'])
        return {"message": "Success"}

    except Exception as e:
        print(e) 
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/temperature_names")
def get_temperature_names(file: UploadFile = File(...)):

    print("pdf_file_path: ", file)
    oven_function.set_pdf_file_path(file)
    names = oven_function.get_names()
    return {"names": names}




