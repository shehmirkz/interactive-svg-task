import InteractiveSVG1 from './components/InteractiveSVG1'
import InteractiveSVG2 from './components/InteractiveSVG2'

const App = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            {/* Hierarchical SVG */}
            <InteractiveSVG1 />

            {/* Flat SVG */}
            <InteractiveSVG2 />
        </div>
    )
}

export default App