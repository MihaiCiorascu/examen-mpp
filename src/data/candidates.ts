export interface Candidate {
  id: string;
  name: string;
  politicalParty: string;
  picture: string;
}

export const candidates: Candidate[] = [
  {
    id: "1",
    name: "Lionel Messi",
    politicalParty: "Democratic Party",
    picture: "/candidates/messi.jpg"
  },
  {
    id: "2", 
    name: "Robert Lewandowski",
    politicalParty: "Republican Party",
    picture: "/candidates/lewa.jpg"
  },
  {
    id: "3",
    name: "Pedri González",
    politicalParty: "Independent",
    picture: "/candidates/pedri.jpg"
  },
  {
    id: "4",
    name: "Raphinha",
    politicalParty: "Green Party",
    picture: "/candidates/raphina.jpg"
  },
  {
    id: "5",
    name: "Ferran Torres",
    politicalParty: "Libertarian Party",
    picture: "/candidates/ferran.jpg"
  },
  {
    id: "6",
    name: "Lamine Yamal",
    politicalParty: "Democratic Party",
    picture: "/candidates/yamal.jpeg"
  },
  {
    id: "7",
    name: "Gavi",
    politicalParty: "Progressive Party",
    picture: "/candidates/gavi.jpg"
  },
  {
    id: "8",
    name: "Ronald Araujo",
    politicalParty: "Conservative Party",
    picture: "/candidates/araujo.jpg"
  },
  {
    id: "9",
    name: "Johan Cruyff",
    politicalParty: "Reform Party",
    picture: "/candidates/cruyff.jpg"
  },
  {
    id: "10",
    name: "Hans-Dieter Flick",
    politicalParty: "Unity Party",
    picture: "/candidates/flick.png"
  }
]; 