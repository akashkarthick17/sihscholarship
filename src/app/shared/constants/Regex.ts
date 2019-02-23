export class Regex {
    public static email = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    public static password = '[a-zA-Z0-9]{6,14}';
    public static examineeName = '[a-zA-Z0-9]{3,14}';
    public static location = '[a-zA-Z0-9]{3,14}';
    public static address = '[a-zA-Z0-9]{6,30}';
    public static phoneNumber = '[0-9]{10}';
    public static department = '[a-zA-Z0-9]{6,30}';
    public static organizationName = '^[A-Za-z0-9 \\.]{6,30}$';
    public static idNumber = '[0-9]{6,10}';
    public static occupation = '[a-zA-Z]+';
    public static firstName = '[a-zA-Z0-9]{6,30}';
    public static lastName = '[a-zA-Z0-9]{6,30}';
    public static username = '[a-zA-Z0-9]{6,30}';
    public static duration = '([0-9]+(h ))?([0-5]{0,1}[0-9]m)?';
}
