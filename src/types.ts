export interface Frame {
  id: string;
  title: string;
  imageUrl?: string;
  shotType: string;
  description: string;
  duration: string;
  cameraMovement: string;
  notes: string;
}

export type ShotType = 'Wide' | 'Medium' | 'Close-up' | 'POV' | 'Aerial' | 'Custom';