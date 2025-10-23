import data from "../data/segments1.json";

const colors = ["#C0392B", "#1B4F72", "#6C3483"];

const InteractiveSVG1 = () => {
    const handleClick = (label: string) => alert(`Clicked: ${label}`);

    const centerX = 350;
    const centerY = 350;
    const baseRadius = 70;
    const maxRadius = 300;
    const levels = 3;
    const ringWidth = (maxRadius - baseRadius) / levels;
    const totalSize = (maxRadius + ringWidth + 40) * 2;

    const wrapLabel = (text: string, maxChars = 14) => {
        const words = text.split(" ");
        const lines: string[] = [];
        let line = "";
        for (const word of words) {
            if ((line + word).length > maxChars) {
                lines.push(line.trim());
                line = word + " ";
            } else line += word + " ";
        }
        lines.push(line.trim());
        return lines;
    };

    const wrapText = (text: string, maxChars = 12) => {
        const words = text.split(" ");
        const lines: string[] = [];
        let line = "";
        for (const word of words) {
            if ((line + word).length > maxChars) {
                lines.push(line.trim());
                line = word + " ";
            } else line += word + " ";
        }
        lines.push(line.trim());
        return lines;
    };

    const drawWedge = (
        innerR: number,
        outerR: number,
        start: number,
        end: number
    ) => {
        const x1 = centerX + innerR * Math.cos(start);
        const y1 = centerY + innerR * Math.sin(start);
        const x2 = centerX + innerR * Math.cos(end);
        const y2 = centerY + innerR * Math.sin(end);
        const xOuter1 = centerX + outerR * Math.cos(start);
        const yOuter1 = centerY + outerR * Math.sin(start);
        const xOuter2 = centerX + outerR * Math.cos(end);
        const yOuter2 = centerY + outerR * Math.sin(end);

        return `
            M ${x1} ${y1}
            A ${innerR} ${innerR} 0 0 1 ${x2} ${y2}
            L ${xOuter2} ${yOuter2}
            A ${outerR} ${outerR} 0 0 0 ${xOuter1} ${yOuter1}
            Z
        `;
    };

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${totalSize} ${totalSize}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ maxWidth: "750px", display: "block", margin: "0 auto" }}
        >
            <circle
                cx={centerX}
                cy={centerY}
                r={baseRadius - 10}
                fill="#fff"
                stroke="#ccc"
                strokeWidth="2"
            />
            <text
                x={centerX}
                y={centerY + 5}
                textAnchor="middle"
                fontSize="16"
                fill="#1A5276"
                fontWeight="bold"
            >
                logo
            </text>

            {data.sectors.map((sector, sIdx) => {
                const fullCircle = 2 * Math.PI;
                const sectorStart =
                    sIdx * (fullCircle / data.sectors.length) - Math.PI / 2;
                const sectorEnd = sectorStart + fullCircle / data.sectors.length;
                const sectorColor = colors[sIdx % colors.length];

                const innerPath = drawWedge(
                    baseRadius,
                    baseRadius + ringWidth,
                    sectorStart,
                    sectorEnd
                );

                const innerMid = (sectorStart + sectorEnd) / 2;
                const innerTextR = baseRadius + ringWidth / 2;
                const innerTextX = centerX + innerTextR * Math.cos(innerMid);
                const innerTextY = centerY + innerTextR * Math.sin(innerMid);

                return (
                    <g key={sector.id}>
                        <path
                            d={innerPath}
                            fill={sectorColor}
                            stroke="#fff"
                            strokeWidth="1.5"
                            onClick={() => handleClick(sector.label)}
                            style={{ cursor: "pointer" }}
                        />
                        <text
                            x={innerTextX}
                            y={innerTextY}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fill="#fff"
                            fontSize="11"
                            fontWeight="600"
                        >
                            {sector.label}
                        </text>

                        {sector.children &&
                            sector.children.map((group, gIdx) => {
                                const groupSpan =
                                    (sectorEnd - sectorStart) /
                                    sector.children.length;
                                const groupStart = sectorStart + gIdx * groupSpan;
                                const groupEnd = groupStart + groupSpan;
                                const midColor = sectorColor;
                                const midPath = drawWedge(
                                    baseRadius + ringWidth,
                                    baseRadius + 2 * ringWidth,
                                    groupStart,
                                    groupEnd
                                );

                                const midMid = (groupStart + groupEnd) / 2;
                                const midTextR = baseRadius + 1.3 * ringWidth;
                                const midTextX =
                                    centerX + midTextR * Math.cos(midMid);
                                const midTextY =
                                    centerY + midTextR * Math.sin(midMid);
                                const lines = wrapLabel(group.label, 1);

                                return (
                                    <g key={group.id}>
                                        <path
                                            d={midPath}
                                            fill={midColor}
                                            stroke="#fff"
                                            strokeWidth="1.5"
                                            onClick={() => handleClick(group.label)}
                                            style={{ cursor: "pointer" }}
                                        />

                                        {lines.map((line, i) => (
                                            <text
                                                key={i}
                                                x={midTextX}
                                                y={
                                                    midTextY +
                                                    i * 12 -
                                                    (lines.length - 1) * 6
                                                }
                                                textAnchor="middle"
                                                alignmentBaseline="middle"
                                                fill="#fff"
                                                fontSize="9"
                                                fontWeight="500"
                                            >
                                                {line}
                                            </text>
                                        ))}

                                        {group.segments &&
                                            group.segments.map((seg, segIdx) => {
                                                const leafSpan =
                                                    (groupEnd - groupStart) /
                                                    group.segments.length;
                                                const leafStart =
                                                    groupStart + segIdx * leafSpan;
                                                const leafEnd = leafStart + leafSpan;
                                                const outerPath = drawWedge(
                                                    baseRadius + 2 * ringWidth,
                                                    baseRadius + 3 * ringWidth,
                                                    leafStart,
                                                    leafEnd
                                                );

                                                const leafMid =
                                                    (leafStart + leafEnd) / 2;
                                                const textR =
                                                    baseRadius + 2.5 * ringWidth;
                                                const textX =
                                                    centerX +
                                                    textR * Math.cos(leafMid);
                                                const textY =
                                                    centerY +
                                                    textR * Math.sin(leafMid);
                                                const lines = wrapText(seg.label, 12);

                                                return (
                                                    <g key={seg.id}>
                                                        <path
                                                            d={outerPath}
                                                            fill={midColor}
                                                            stroke="#fff"
                                                            strokeWidth="1.2"
                                                            onClick={() =>
                                                                handleClick(seg.label)
                                                            }
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        />
                                                        {lines.map(
                                                            (line, lineIdx) => (
                                                                <text
                                                                    key={lineIdx}
                                                                    x={textX}
                                                                    y={
                                                                        textY +
                                                                        lineIdx * 12 -
                                                                        (lines.length -
                                                                            1) *
                                                                        6
                                                                    }
                                                                    textAnchor="middle"
                                                                    alignmentBaseline="middle"
                                                                    fill="#fff"
                                                                    fontSize="9"
                                                                    fontWeight="500"
                                                                    style={{
                                                                        pointerEvents:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    {line}
                                                                </text>
                                                            )
                                                        )}
                                                    </g>
                                                );
                                            })}
                                    </g>
                                );
                            })}
                    </g>
                );
            })}
        </svg>
    );
};

export default InteractiveSVG1;
