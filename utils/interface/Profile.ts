export interface ProfilePageProps {
  name: string;
  education: string;
  position: string;
  grade: string;
  address: string;
  wa: string;
  instagram: string;
  about: string;
}

export interface ProfileProps extends ProfilePageProps {
  image: string;
}