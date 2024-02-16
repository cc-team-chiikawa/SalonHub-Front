import { karte } from "@/types/karte";

export const getKarte = async (id: string) => {
  const data = await fetch(`/api/kartes/${id}`);
  const kartes = await data.json();
  return kartes as karte;
};

export const postKarte = async (newKarte: karte) => {
  const response = await fetch("/api/kartes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newKarte),
  });

  if (!response.ok) {
    throw new Error("Failed to post new karte");
  }

  const karte = await response.json();
  return karte as karte;
};

export const patchKarte = async (id: string, updatedKarte: karte) => {
  const response = await fetch(`/api/kartes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedKarte),
  });

  if (!response.ok) {
    throw new Error("Failed to update karte");
  }

  const karte = await response.json();
  return karte as karte;
};
