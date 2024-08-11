"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  //console.log("update Profile: ", formData);
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");
  const updateData = { nationality, countryFlag, nationalID };
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  // for testing - Verzögerung ...
  //await new Promise((res) => setTimeout(res, 3000));
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId);

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const reservationId = Number(formData.get("reservationId"));
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000); // nur die ersten 1000 Zeichen

  const updatedFields = { numGuests, observations };
  //console.log(`updating #${reservationId} ... `);
  //console.log(updatedFields);

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", reservationId)
    .eq("guestId", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/account/reservations/edit/${reservationId}`); // damit wird die Editseite dieser Reservierung invalidiert (sonst sieht man die alten Daten, wenn man schnell genug hierher zurückkommt)
  revalidatePath("/account/reservations"); // damit wird die Übersichtsseite invalidiert und damit neu geladen - wenn man hingeht, was wir im nächsten Schritt machen
  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    isPaid: false,
    hasBreakfast: false,
  };
  //console.log(newBooking);
  // ACHTUNG: Eigentlich muss man hier am Server erneut prüfen, ob der gewünschte Zeitraum frei ist !

  const { error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" }); // verwende den google Auth Provider und wenn du erfolgreich angemeldet bist, redirecte zur /account Route
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" }); // wenn du erfolgreich abgemeldet bist, redirecte zur / Route
}
