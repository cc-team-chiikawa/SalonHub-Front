import { karte } from "@/types/karte";

export const getKarte = async (id: string) => {
  const data = await fetch(`/api/kartes/${id}`);
  const karte = await data.json();

  // 日付を Date オブジェクトに変換
  if (karte.treatmentDay) {
    karte.treatmentDay = new Date(karte.treatmentDay);
  }

  if (karte.treatmented) {
    karte.treatmentedMenuIds = karte.treatmented.map(
      (menu: { id: string }) => `${menu.id}` // TODO: 要調査
    );
  }

  if (karte.interesting) {
    karte.interestingMenuIds = karte.interesting.map(
      (menu: { id: string }) => `${menu.id}`
    );
  }

  return karte as karte;
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

  // 日付を Date オブジェクトに変換
  if (karte.treatmentDay) {
    karte.treatmentDay = new Date(karte.treatmentDay);
  }

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

  // 日付を Date オブジェクトに変換
  if (karte.treatmentDay) {
    karte.treatmentDay = new Date(karte.treatmentDay);
  }

  return karte as karte;
};
