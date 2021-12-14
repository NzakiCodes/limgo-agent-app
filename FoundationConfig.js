import { Colors, Typography, Spacings } from 'react-native-ui-lib';

Colors.loadColors({
    primaryColor: '##00923f',
    secondaryColor: '#191919',
    textColor: '##221D23',
    errorColor: '#e90000',
    successColor: '#00923f',
    warnColor: '#FF963C'
});

Typography.loadTypographies({
    heading: { fontSize: 36, fontWeight: '600' },
    subheading: { fontSize: 28, fontWeight: '500' },
    body: { fontSize: 18, fontWeight: '400' },
});

Spacings.loadSpacings({
    page: 20,
    card: 12,
    gridGutter: 16
});
