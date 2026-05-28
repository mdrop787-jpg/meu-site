import Nav from '../components/Nav'
import GalleryList from '../components/GalleryList'
export default function Gallery() {
  return (
    <div>
      <Nav />
      <main style={{maxWidth:1100,margin:'24px auto',padding:16}}>
        <h2>Galeria OpenSea</h2>
        <GalleryList limit={12} />
      </main>
    </div>
  )
}
