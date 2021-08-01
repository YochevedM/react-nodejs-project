import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        direction: 'rtl'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

/**Accordination display information about the product*/

const Accordination = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header">
                    <Typography className={classes.heading}>פרטי המוצר</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        מידות:
                        {props.dimensions}
                        <br />
                        {props.maintenance && <span>תחזוקה:
                        {props.maintenance}</span>}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    aria-controls="panel2bh-content"
                    id="panel2bh-header">
                    <Typography className={classes.heading}>הובלה והרכבה</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        עלות ההובלה וההרכבה אינה כלולה במחיר המוצר והם ישולמו בעת ביצוע ההזמנה.
                        שרות ההובלה יתבצע באמצעות חברתנו או על ידי חברות קבלן חיצוניות
                        אספקת המוצרים שנרכשו באתר אפשרית רק כאשר המען המבוקש כלול בתוך אזור שירות ההובלות ואין מניעה טכנית אחרת המונעת אספקת המוצרים כאמור ובכל מקרה בו יסתבר כי דרכי הגישה מצריכים שירותים מיוחדים כגון : מנוף , יישא הלקוח במלוא העלויות הנוספות
                        הרוכש מתחייב לאפשר האספקה במועדים שהוסכמו. במקרה של דחיית מועד האספקה ביוזמת הרוכש, תתאפשר אחסון ההזמנה במחסני החברה לתקופה שלא תעלה על חודש ימים.
                        על הרוכש חלה האחריות לבדוק האפשרות להכנסת המוצר לביתו לפי מידות המוצר
                        הכנסת הסחורה תתבצע דרך דלת ראשית בלבד. במקרה במידה ויידרש שרות מנוף, יושת התשלום על הרוכש
                        בהובלה למקומות ללא גישה למשאית, תתואם נקודת מפגש עם המוביל לאספקת המותר בלבד ללא הרכבה
                        בהובלה רגלית (בניין ללא מעלית/המוצר לא נכנס במעלית) ישולם סך נוסף של 50 ₪ בעבור כל קומה החל מקומה שלישית (כולל).
                        איסוף הסחורה באופן עצמאי יתאפשר ממחסן החברה ברחוב ברקת 10בעד הלום בלבד, בתיאום מראש ובכפוף לשעות פעילות המחסן ,באחריות הרוכש לבדוק את תקינות הסחורה טרם איסופה. נטילת הסחורה תהווה הודאה מצד הלקוח על תקינותה של הסחורה.
                        שעות פעילות המחסן א – ה 10:00-16:00
                        רח’ ברקת 10 עד הלום טל. 08-9933745
                        במשלוח המוצרים בשנית בשל סיבה התלויה ברוכש, יחויב הרוכש בנוסף לתשלום דמי ההובלה הראשוניים גם בתשלום דמי הובלה נוספים
                        אי עמידת מפעילת האתר במועד האספקה המבוקש מכל סיבה שהיא לא תפטור, בכל דרך שהיא, את הלקוח מחובת התשלום בגין האספקה
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    aria-controls="panel3bh-content"
                    id="panel3bh-header">
                    <Typography className={classes.heading}>אחריות</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        האחריות למוצר הינה ל-12 חודשים, ריפודים ומוצרי טקסטיל – 6 חודשים החל ממועד אספקת המוצר לבית הרוכש, בהתאם ובכפוף לתנאים המפורטים ב/או בכפוף לתעודת האחריות המצורפת בעת האספקה.
                        האחריות אינה כוללת: שמשיות , גזיבו בשילוב בד (מבנה הצללה) ושבר זכוכית.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default Accordination;
