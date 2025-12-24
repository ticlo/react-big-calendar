export default function getStyledEvents({ events, minimumStartDifference, slotMetrics, accessors, }: {
    events: any;
    minimumStartDifference: any;
    slotMetrics: any;
    accessors: any;
}): {
    event: any;
    style: {
        top: any;
        height: any;
        width: any;
        xOffset: number;
    };
}[];
