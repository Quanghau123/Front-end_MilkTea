export interface ReviewProps {
  _id: string;
  TourId: string;
  UserId?: string;
  avatar?: string;
  UserName: string;
  Title: string;
  Rating: number;
  Comment: string;
}
