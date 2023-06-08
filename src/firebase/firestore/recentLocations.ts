import { LocationSuggestion } from "@/types/weatherApi";
import { addDocument, editDocument, getDocumentRef, getDocumentsByUserUid } from "@/firebase/firestore/api";
import removeByIndex from "@/util/removeByIndex";

export type UserLocationData = {
  userUid: string;
  locations: LocationSuggestion[];
};

const COLLECTION_NAME = 'recentLocations';
const MAX_LENGTH = 10;

function addUniqueLocation(locations: LocationSuggestion[], newLocation: LocationSuggestion): LocationSuggestion[] {
  const locationExists = locations.some(
    location => location.lat === newLocation.lat && location.lon === newLocation.lon
  );

  if (!locationExists) {
    return [...locations, newLocation];
  }

  return locations;
}

export async function addRecentLocation(userUid: string, location: LocationSuggestion): Promise<void> {
  console.debug('Adding recent location for user', userUid, location);
  const userLocations = await getUserRecentLocations(userUid);

  console.debug('userLocations', userLocations);

  if (userLocations?.doc) {
    const { id, data: { locations } } = userLocations.doc;


    const updatedLocations = addUniqueLocation(locations, location);

    if (updatedLocations.length >= MAX_LENGTH) {
      updatedLocations.shift();
    }

    console.debug('Recent locations found for user. Updating document.')
    await editDocument(COLLECTION_NAME, id, { locations: updatedLocations });
  } else {
    console.debug('No recent locations found for user. Adding new document.')
    await addDocument(COLLECTION_NAME, { userUid, locations: [location] });
  }
}

export async function getUserRecentLocations(userUid: string) {
  const documents = await getDocumentsByUserUid<UserLocationData>(COLLECTION_NAME, userUid);

  console.debug('getUserRecentLocations', documents);

  if (!documents) {
    return null;
  }

  if (documents && documents.length > 0) {
    console.warn(`Found ${documents.length} documents for user with UID: ${userUid}. Using first document.`);
  }
  const docRef = getDocumentRef(COLLECTION_NAME, documents[0].id);

  return { doc: documents[0], ref: docRef };
}

export async function removeRecentLocation(userUid: string, locationIndex: number): Promise<void> {
  const userLocations = await getUserRecentLocations(userUid);

  if (userLocations) {
    const { id, data: { locations } } = userLocations.doc;

    const updatedLocations = removeByIndex(locations, locationIndex);

    console.log('removing', updatedLocations)

    await editDocument(COLLECTION_NAME, id, { locations: updatedLocations });
  } else {
    console.log(`No locations found for user with UID: ${userUid}`);
  }
}
