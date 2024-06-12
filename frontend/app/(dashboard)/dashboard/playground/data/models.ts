export const types = ["GPT-3", "Codex"] as const

export type ModelType = (typeof types)[number]

export interface Model<Type = string> {
  id: string
  name: string
  description?: string
  type?: Type
}

export const ovenDropDownOptions: Model<ModelType>[] = [
    {
      id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
      name: "#1 (°C) AIR TEMP PROBE HIGH",
    },
    {
      id: "464a47c3-7ab5-44d7-b669-f9cb5a9e8465",
      name: "#2 (°C) AIR TEMP PROBE LOW",
    },
    {
      id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
      name: "#3 (°C) METAL TEMP 8MM",
    },
    {
      id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
      name: "#4 (°C) METAL TEMP 13MM",
    }
]
  