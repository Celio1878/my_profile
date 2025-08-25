import type { Language } from "~/lib/language-context";

type TranslationKey =
  | "heroTitle"
  | "heroSubtitle"
  | "getStarted"
  | "forReaders"
  | "forWriters"
  | "featuresTitle"
  | "feature1Title"
  | "feature1Desc"
  | "feature2Title"
  | "feature2Desc"
  | "feature3Title"
  | "feature3Desc"
  | "ctaTitle"
  | "ctaSubtitle"
  | "joinNow"
  | "learnMore"
  | "mobileAppTitle"
  | "mobileAppSubtitle"
  | "mobileAppInf"
  | "securityTitle"
  | "securitySubtitle"
  | "securityFeature1"
  | "securityFeature2"
  | "bookTypesTitle"
  | "bookTypesSubtitle"
  | "bookType1"
  | "bookType2"
  | "bookType3"
  | "freeAppTitle"
  | "freeAppDesc"
  | "login"
  | "readerAdvantage1"
  | "readerAdvantage2"
  | "readerAdvantage3"
  | "writerAdvantage1"
  | "writerAdvantage2"
  | "writerAdvantage3"
  | "mobileAppLoginAlt"
  | "mobileAppSearchAlt"
  | "mobileAppHomeAlt"
  | "securityFeature1Content"
  | "securityFeature2Content"
  | "bookType1Content"
  | "bookType2Content"
  | "bookType3Content"
  | "privacyPolicy"
  | "termsOfUse"
  | "contact"
  | "support"
  | "copyright"
  | "addCommentButton"
  | "reading"
  | "whoAreReading"
  | "whoLiked"
  | "reply"
  | "commentPlaceholder"
  | "commentsEmpty"
  | "formCoverLabel"
  | "formTitleLabel"
  | "formDescriptionLabel"
  | "formGenreLabel"
  | "formSelectGenre"
  | "formAgeRangeLabel"
  | "formSelectAge"
  | "formCopyrightLabel"
  | "formSelectCopyright"
  | "formTagsLabel"
  | "formCoauthorsLabel"
  | "formSubmit"
  | "formSubmitting"
  | "coverPreviewAlt"
  | "errorGenericTitle"
  | "errorUnspecified"
  | "errorLabel"
  | "checkEmailTitle"
  | "resetInstructionsSent"
  | "resetEmailHint"
  | "resetYourPasswordTitle"
  | "resetPasswordSubtitle"
  | "emailLabel"
  | "emailPlaceholder"
  | "sending"
  | "sendResetEmail"
  | "alreadyHaveAccount"
  | "loginSubtitle"
  | "register"
  | "passwordRequired"
  | "passwordsDoNotMatch"
  | "signupThanksTitle"
  | "signupCheckEmail"
  | "signupSuccessBody"
  | "signUp"
  | "createNewAccount"
  | "enterNewPasswordBelow"
  | "newPasswordLabel"
  | "saving"
  | "saveNewPassword"
  | "creatingBookTitle"
  | "createChapterTitle"
  | "contentLabel"
  | "updateChapterTitle"
  | "updatingBookTitle"
  | "chaptersTitle"
  | "loadingSections"
  | "loadingAuthors"
  | "loadingComments"
  | "searchPlaceholder"
  | "tagInputPlaceholder"
  | "coauthorInputPlaceholder"
  | "filtersTitle"
  | "apply"
  | "supportNeedHelpTitle"
  | "supportSubtitle"
  | "supportEmailLead"
  | "subjectLabel"
  | "send"
  | "followers"
  | "readingList"
  | "authorOf"
  | "followUserAria"
  | "unfollowUserAria"
  | "dontHaveAccount"
  | "termsTitle"
  | "termsSubtitle"
  | "termsSection1Title"
  | "termsSection1Body"
  | "termsSection2Title"
  | "termsSection2Body"
  | "termsSection2List1"
  | "termsSection2List2"
  | "termsSection2List3"
  | "termsSection3Title"
  | "termsSection3Body1"
  | "termsSection3Body2"
  | "termsSection4Title"
  | "termsSection4Body"
  | "termsSection5Title"
  | "termsSection5Body"
  | "termsSection6Title"
  | "termsSection6Body"
  | "termsSection7Title"
  | "termsSection7Body"
  | "termsSection8Title"
  | "termsSection8Body"
  | "termsSection9Title"
  | "termsSection9Body"
  | "termsSection10Title"
  | "termsSection10Body"
  | "termsContactEmailLabel"
  // Privacy Policy page keys
  | "ppTitle"
  | "ppIntroTitle"
  | "ppIntroBody"
  | "ppInfoWeCollectTitle"
  | "ppPersonalInfoTitle"
  | "ppPersonalInfoItem1"
  | "ppContentInfoTitle"
  | "ppContentInfoItem1"
  | "ppContentInfoItem2"
  | "ppContentInfoItem3"
  | "ppUsageDataTitle"
  | "ppUsageDataItem1"
  | "ppUsageDataItem2"
  | "ppCookiesTitle"
  | "ppCookiesItem1"
  | "ppHowWeUseTitle"
  | "ppHowWeUseLead"
  | "ppHowWeUseItem1"
  | "ppHowWeUseItem2"
  | "ppHowWeUseItem3"
  | "ppHowWeUseItem4"
  | "ppHowWeUseItem5"
  | "ppSharingTitle"
  | "ppSharingLead"
  | "ppServiceProvidersTitle"
  | "ppServiceProvidersItem1"
  | "ppLegalRequirementsTitle"
  | "ppLegalRequirementsItem1"
  | "ppBusinessTransfersTitle"
  | "ppBusinessTransfersItem1"
  | "ppWithConsentTitle"
  | "ppWithConsentItem1"
  | "ppDataRetentionTitle"
  | "ppDataRetentionBody"
  | "ppDataSecurityTitle"
  | "ppDataSecurityBody"
  | "ppYourRightsTitle"
  | "ppYourRightsLead"
  | "ppRightAccessCorrectionTitle"
  | "ppRightAccessCorrectionItem1"
  | "ppRightDeletionTitle"
  | "ppRightDeletionItem1"
  | "ppRightOptOutTitle"
  | "ppRightOptOutItem1"
  | "ppRightPortabilityTitle"
  | "ppRightPortabilityItem1"
  | "ppInternationalTransfersTitle"
  | "ppInternationalTransfersBody"
  | "ppChangesTitle"
  | "ppChangesBody"
  | "ppContactUsTitle"
  | "ppContactUsLead"
  // Profile page specific keys
  | "editProfileTitle"
  | "editProfileSubtitle"
  | "pictureLabel"
  | "usernameLabel"
  | "bioLabel"
  | "save"
  | "confirmDeleteProfile"
  | "following"
  | "likedBooks"
  | "authorship"
  | "createBook"
  // Main page additions
  | "mainAuthorsTitle"
  // Header additions
  | "myAccount"
  | "profile"
  | "logout"
  // Pagination labels
  | "paginationPrev"
  | "paginationNext"
  | "paginationMore"
  // Search page tab labels and filter sections
  | "tabAll"
  | "tabBooks"
  | "tabUsers"
  | "filtersGenre"
  | "filtersWarning"
  | "filtersAgeRange"
  // Auth and forms (additional)
  | "loggingIn"
  | "creatingAccount"
  | "avatarLabel"
  | "signupUsernameLabel"
  | "usernamePlaceholder"
  | "repeatPasswordLabel"
  | "passwordLabel"
  | "forgotPasswordLink"
  | "loginWithApple"
  | "loginWithGoogle"
  | "loginWithFacebook"
  | "loginWithTwitter"
  | "loginWithDiscord"
  | "avatarPreviewAlt"
  // Main page section titles
  | "mainSectionRecommended"
  | "mainSectionNewReleases"
  | "mainSectionFanfiction"
  | "mainSectionOriginalStories"
  | "mainSectionNovelRomance"
  | "mainSectionAdventure"
  | "mainSectionTerror"
  // Tag option labels (genres)
  | "genreOriginal"
  | "genreFanfic"
  | "genreAdventure"
  | "genreAction"
  | "genreTerror"
  | "genreThriller"
  | "genreHumor"
  | "genreRomance"
  | "genreFantasy"
  // Tag option labels (age ranges)
  | "ageRangeFree"
  | "ageRangeTen"
  | "ageRangeTwelve"
  | "ageRangeSixteen"
  | "ageRangeEighteen"
  // Tag option labels (copyright)
  | "copyrightPrivate"
  | "copyrightPublic"
  // Tag option labels (warnings)
  | "warningAdultery"
  | "warningAlcohol"
  | "warningBdsm"
  | "warningBisexual"
  | "warningSensitiveContent"
  | "warningDrugs"
  | "warningRape"
  | "warningHeterosexual"
  | "warningHomosexual"
  | "warningIntersexuality"
  | "warningInappropriateLanguage"
  | "warningSex"
  | "warningSpoilers"
  | "warningSuicide"
  | "warningTorture"
  | "warningViolence";

type Translations = {
  [key in Language]: Partial<Record<TranslationKey, string>>;
};

export const translations: Translations = {
  en: {
    // Pagination
    paginationPrev: "Go to previous page",
    paginationNext: "Go to next page",
    paginationMore: "More pages",

    editProfileTitle: "Edit Profile",
    editProfileSubtitle: "Update your profile information",
    pictureLabel: "Picture:",
    usernameLabel: "Username:",
    bioLabel: "Biography:",
    save: "Save",
    confirmDeleteProfile:
      "Are you sure you want to delete your profile? This cannot be undone.",
    following: "Following",
    likedBooks: "Liked Books",
    authorship: "Authorship",
    createBook: "Create Book",
    // Header/Footer/Main page new labels
    myAccount: "My Account",
    profile: "Profile",
    logout: "Log Out",
    support: "Support",
    mainAuthorsTitle: "Main Authors",
    // Main page section titles
    mainSectionRecommended: "Recommended for you",
    mainSectionNewReleases: "New Releases",
    mainSectionFanfiction: "Fanfiction",
    mainSectionOriginalStories: "Original Stories",
    mainSectionNovelRomance: "Novel & Romance",
    mainSectionAdventure: "Adventure",
    mainSectionTerror: "Terror",
    heroTitle: "Create, Read and Inspire",
    heroSubtitle:
      "A platform where readers and writers connect, create, and celebrate the art of storytelling",
    getStarted: "Get Started",
    forReaders: "For Readers",
    forWriters: "For Writers",
    featuresTitle: "Why Choose Be Your Stories",
    feature1Title: "Discover New Worlds",
    feature1Desc:
      "Explore thousands of stories across genres, from fantasy to romance, mystery to sci-fi",
    feature2Title: "Connect with Authors",
    feature2Desc:
      "Engage directly with your favorite writers and join a vibrant community of book lovers",
    feature3Title: "Create Without Limits",
    feature3Desc:
      "Powerful yet simple tools to bring your stories to life and share them with the world",
    ctaTitle: "Ready to Begin Your Journey?",
    ctaSubtitle: "Join a lot of readers and writers already on BYS",
    joinNow: "Join Now",
    learnMore: "Learn More",
    mobileAppTitle: "Take Your Stories Anywhere",
    mobileAppSubtitle:
      "Enjoy your favorite books on the go with our mobile app",
    mobileAppInf: "Available for iPhone/iPad and Android",
    securityTitle: "Your Security Matters to Us",
    securitySubtitle:
      "We take the protection of your stories and personal information seriously",
    securityFeature1:
      "Your data is safely stored in the cloud with the same technology trusted by major companies worldwide",
    securityFeature2:
      "All your information is encrypted and protected with industry-leading security measures",
    bookTypesTitle: "Explore a World of Stories",
    bookTypesSubtitle:
      "Discover books across every genre to match your mood and interests",
    bookType1: "Fiction: Fantasy, Sci-Fi, Mystery, Romance, and more",
    bookType2:
      "Non-Fiction: Biographies, Self-Help, History, and Educational content",
    bookType3:
      "Poetry and Short Stories: Perfect for quick reads and literary inspiration",
    freeAppTitle: "100% Free to Use",
    freeAppDesc:
      "Enjoy all the features of Be Your Stories without any cost - reading and sharing stories has never been easier",
    login: "Login",
    readerAdvantage1: "Discover stories from talented writers worldwide",
    readerAdvantage2: "Create personalized reading lists and collections",
    readerAdvantage3: "Connect with a community that shares your interests",
    writerAdvantage1: "Powerful writing tools to bring your stories to life",
    writerAdvantage2: "Build your audience and receive valuable feedback",
    writerAdvantage3: "Grow as a writer",
    mobileAppLoginAlt: "Mobile App LoginPage Screen",
    mobileAppSearchAlt: "Mobile App Search Screen",
    mobileAppHomeAlt: "Mobile App Home Screen",
    securityFeature1Content:
      "We use trusted cloud services to keep your stories and personal information safe and accessible whenever you need them.",
    securityFeature2Content:
      "Your privacy matters to us. We use advanced encryption to protect your data, ensuring only you control who can access your stories.",
    bookType1Content:
      "Immerse yourself in imaginative worlds, thrilling adventures, and heartwarming romances crafted by talented storytellers.",
    bookType2Content:
      "Expand your knowledge and gain insights from real-life experiences, historical events, and expert advice on various subjects.",
    bookType3Content:
      "Enjoy bite-sized literary gems that pack powerful emotions and ideas into concise, beautifully crafted pieces.",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    contact: "Contact",
    copyright: "© {year} Be Your Stories. All rights reserved.",
    addCommentButton: "Add Comment",
    reading: "Reading",
    whoAreReading: "Who Are Reading",
    whoLiked: "Who Liked",
    reply: "Reply",
    commentPlaceholder: "Type your comment...",
    commentsEmpty: "No comments yet. Be the first to comment!",
    formCoverLabel: "Cover:",
    formTitleLabel: "Title:",
    formDescriptionLabel: "Description:",
    formGenreLabel: "Genre:",
    formSelectGenre: "Select Genre",
    formAgeRangeLabel: "Age Range:",
    formSelectAge: "Select Age",
    formCopyrightLabel: "Copyright:",
    formSelectCopyright: "Select Copyright",
    // Tag option labels
    genreOriginal: "Original",
    genreFanfic: "Fanfic",
    genreAdventure: "Adventure",
    genreAction: "Action",
    genreTerror: "Terror",
    genreThriller: "Thriller",
    genreHumor: "Humor",
    genreRomance: "Romance",
    genreFantasy: "Fantasy",
    ageRangeFree: "Free",
    ageRangeTen: "+10",
    ageRangeTwelve: "+12",
    ageRangeSixteen: "+16",
    ageRangeEighteen: "+18",
    copyrightPrivate: "Private",
    copyrightPublic: "Public",
    warningAdultery: "Adultery",
    warningAlcohol: "Alcohol",
    warningBdsm: "BDSM",
    warningBisexual: "Bisexual",
    warningSensitiveContent: "Sensitive Content",
    warningDrugs: "Drugs",
    warningRape: "Rape",
    warningHeterosexual: "Heterosexual",
    warningHomosexual: "Homosexual",
    warningIntersexuality: "Intersexuality",
    warningInappropriateLanguage: "Inappropriate Language",
    warningSex: "Sex",
    warningSpoilers: "Spoilers",
    warningSuicide: "Suicide",
    warningTorture: "Torture",
    warningViolence: "Violence",
    formTagsLabel: "Tags:",
    formCoauthorsLabel: "CoAuthors:",
    formSubmit: "Submit",
    formSubmitting: "Submitting",
    coverPreviewAlt: "Cover preview",
    errorGenericTitle: "Sorry, something went wrong.",
    errorUnspecified: "An unspecified error occurred.",
    errorLabel: "Error:",
    checkEmailTitle: "Check Your Email",
    resetInstructionsSent: "Password reset instructions sent",
    resetEmailHint:
      "If you registered using your email and password, you will receive a password reset email.",
    resetYourPasswordTitle: "Reset Your Password",
    resetPasswordSubtitle:
      "Type in your email and we'll send you a link to reset your password",
    emailLabel: "Email",
    emailPlaceholder: "m@example.com",
    sending: "Sending...",
    sendResetEmail: "Send reset email",
    alreadyHaveAccount: "Already have an account?",
    loginSubtitle: "Enter your email below to login to your account",
    register: "Register",
    passwordRequired: "Password is required",
    passwordsDoNotMatch: "Passwords do not match",
    signupThanksTitle: "Thank you for signing up!",
    signupCheckEmail: "Check your email to confirm",
    signupSuccessBody:
      "You've successfully signed up. Please check your email to confirm your account before signing in.",
    signUp: "Sign up",
    createNewAccount: "Create a new account",
    enterNewPasswordBelow: "Please enter your new password below.",
    newPasswordLabel: "New password",
    saving: "Saving...",
    saveNewPassword: "Save new password",
    creatingBookTitle: "Creating Book",
    createChapterTitle: "Create Chapter",
    contentLabel: "Content:",
    updateChapterTitle: "Update Chapter",
    updatingBookTitle: "Updating Book",
    chaptersTitle: "Chapters",
    loadingSections: "Loading sections...",
    loadingAuthors: "Loading authors...",
    loadingComments: "Loading comments...",
    searchPlaceholder: "Search for books, users...",
    tagInputPlaceholder: "Enter tag",
    coauthorInputPlaceholder: "Enter coauthor's name",
    filtersTitle: "Filters",
    apply: "Apply",
    // Search tabs
    tabAll: "All",
    tabBooks: "Books",
    tabUsers: "Users",
    // Filter section titles
    filtersGenre: "Genre",
    filtersWarning: "Warning",
    filtersAgeRange: "Age Range",
    supportNeedHelpTitle: "Need some help?",
    supportSubtitle:
      "If you're running into problems, we want to help you ASAP!",
    supportEmailLead: "Send us an email at",
    subjectLabel: "Subject:",
    send: "Send",
    followers: "Followers",
    readingList: "Reading List",
    authorOf: "Author of",
    followUserAria: "Follow user",
    unfollowUserAria: "Unfollow user",
    dontHaveAccount: "Don't have an account?",
    // Additional auth/form labels
    loggingIn: "Logging in...",
    creatingAccount: "Creating an account...",
    avatarLabel: "Avatar",
    signupUsernameLabel: "Username",
    usernamePlaceholder: "your_username",
    repeatPasswordLabel: "Repeat Password",
    passwordLabel: "Password",
    forgotPasswordLink: "Forgot your password?",
    loginWithApple: "Login with Apple",
    loginWithGoogle: "Login with Google",
    loginWithFacebook: "Login with Facebook",
    loginWithTwitter: "Login with Twitter",
    loginWithDiscord: "Login with Discord",
    avatarPreviewAlt: "Avatar preview",

    termsTitle: "Terms and Conditions of Use",
    termsSubtitle: "Legal Information & Notices",
    termsSection1Title: "1. Acceptance of Terms",
    termsSection1Body:
      "By accessing and using our platform, you agree to the following terms and conditions. If you do not agree with any part of these terms, you should not use our platform.",
    termsSection2Title: "2. Use of the Platform",
    termsSection2Body:
      "Our platform allows users to read and write books. By using the platform, you agree to use the services only for lawful purposes and in accordance with applicable regulations. You must not:",
    termsSection2List1:
      "Post content that is offensive, harmful, illegal, or infringes the rights of third parties.",
    termsSection2List2:
      "Use the platform for fraudulent or deceptive activities.",
    termsSection2List3:
      "Distribute copyrighted content without proper permission.",
    termsSection3Title: "3. User-Generated Content",
    termsSection3Body1:
      "You are responsible for the content you create and publish on our platform. By submitting content, you warrant that you have all necessary rights to do so. The platform is not responsible for any user-generated content.",
    termsSection3Body2:
      "By submitting content, you grant the platform a worldwide, non-exclusive, royalty-free, transferable license to use, display, modify, adapt, and distribute such content in connection with the operation of the platform.",
    termsSection4Title: "4. Intellectual Property Rights",
    termsSection4Body:
      "All content available on the platform, including texts, graphics, logos, images, and software, is the property of the platform or their respective owners, protected by copyright and intellectual property laws. Unauthorized use of any material may violate these laws.",
    termsSection5Title: "5. Privacy and Data",
    termsSection5Body:
      "By using our platform, you agree to our privacy policy. We respect your privacy and protect your personal information. We will not share your information with third parties except as described in our privacy policy.",
    termsSection6Title: "6. Age Restrictions",
    termsSection6Body:
      "Some content may be restricted for users under 18 years old.",
    termsSection7Title: "7. Account Termination",
    termsSection7Body:
      "We reserve the right to suspend or terminate your account at any time, without prior notice, if we believe that you have violated any of these terms. You may also choose to close your account at any time by contacting us.",
    termsSection8Title: "8. Changes to the Terms",
    termsSection8Body:
      "We may revise and update these terms from time to time. If we make material changes, we will notify you through our platform or by email. Your continued use of the platform after the changes are posted constitutes your acceptance of the new terms.",
    termsSection9Title: "9. Governing Law",
    termsSection9Body:
      "These terms are governed by the laws of Brazil and any disputes will be resolved exclusively in the courts of Brazil.",
    termsSection10Title: "10. Contact",
    termsSection10Body:
      "If you have any questions or concerns about these terms, please contact us:",
    termsContactEmailLabel: "Email:",

    // Privacy Policy
    ppTitle: "Privacy Policy",
    ppIntroTitle: "Introduction",
    ppIntroBody:
      "At BeYourStories, we value your privacy and are committed to protecting your personal information. This privacy policy explains how we collect, use, and protect information related to your interactions with our platform, which allows users to read and write books.",
    ppInfoWeCollectTitle: "Information We Collect",
    ppPersonalInfoTitle: "1. Personal Information:",
    ppPersonalInfoItem1:
      "Name, email address, image, and username for account creation and authentication.",
    ppContentInfoTitle: "2. Content Information:",
    ppContentInfoItem1: "Books that you write and read.",
    ppContentInfoItem2: "Ratings, comments, and feedback.",
    ppContentInfoItem3:
      "Metadata related to books, such as titles, tags, and summaries.",
    ppUsageDataTitle: "3. Usage Data:",
    ppUsageDataItem1:
      "Information about your interactions with the platform, such as search queries, time spent reading or writing, and pages viewed.",
    ppUsageDataItem2:
      "Device information, such as IP address, browser type, and operating system.",
    ppCookiesTitle: "4. Cookies and Tracking Technologies:",
    ppCookiesItem1:
      "We use cookies and similar technologies to remember your preferences, track usage, and improve site performance.",

    ppHowWeUseTitle: "How We Use Your Information",
    ppHowWeUseLead: "We use the information we collect to:",
    ppHowWeUseItem1: "Manage and maintain your account.",
    ppHowWeUseItem2:
      "Process transactions and communicate with you about updates.",
    ppHowWeUseItem3:
      "Enable social features such as sharing, comments, and user interactions.",
    ppHowWeUseItem4:
      "Improve the platform's functionality and user experience by analyzing usage data.",
    ppHowWeUseItem5:
      "Enforce our terms of service, detect and prevent fraud, and respond to legal obligations.",

    ppSharingTitle: "Sharing Your Information",
    ppSharingLead:
      "We do not share your personal information with third parties, except in the following situations:",
    ppServiceProvidersTitle: "1. Service Providers:",
    ppServiceProvidersItem1:
      "We share information with third-party vendors that help with analytics and customer support.",
    ppLegalRequirementsTitle: "2. Legal Requirements:",
    ppLegalRequirementsItem1:
      "We disclose your information when required by law, such as in response to court orders or legal processes.",
    ppBusinessTransfersTitle: "3. Business Transfers:",
    ppBusinessTransfersItem1:
      "In the event of a merger, acquisition, or asset sale, your information may be transferred to the involved parties.",
    ppWithConsentTitle: "4. With Your Consent:",
    ppWithConsentItem1:
      "If you explicitly consent to share your data with third parties for promotional or other purposes.",

    ppDataRetentionTitle: "Data Retention",
    ppDataRetentionBody:
      "We retain your information while your account is active or as needed to provide services. You may request deletion of your personal information by contacting us, but note that we may retain certain information as required by law.",

    ppDataSecurityTitle: "Data Security",
    ppDataSecurityBody:
      "We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss, or disclosure.",

    ppYourRightsTitle: "Your Rights",
    ppYourRightsLead:
      "You have the following rights regarding your personal data:",
    ppRightAccessCorrectionTitle: "1. Access and Correction:",
    ppRightAccessCorrectionItem1:
      "You can access, update, or correct your personal information through your account settings.",
    ppRightDeletionTitle: "2. Deletion:",
    ppRightDeletionItem1:
      "You may request deletion of your account and associated personal data.",
    ppRightOptOutTitle: "3. Opt Out:",
    ppRightOptOutItem1:
      "By removing your account you will not receive any notifications.",
    ppRightPortabilityTitle: "4. Data Portability:",
    ppRightPortabilityItem1:
      "You have the right to request a copy of your data in a machine-readable format.",

    ppInternationalTransfersTitle: "International Data Transfers",
    ppInternationalTransfersBody:
      "If you are accessing our platform from outside Brazil, please note that your data may be transferred to and stored in a country that does not have the same level of data protection laws as your home jurisdiction.",

    ppChangesTitle: "Changes to This Privacy Policy",
    ppChangesBody:
      "We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We recommend that you review this page periodically.",

    ppContactUsTitle: "Contact Us",
    ppContactUsLead:
      "If you have any questions or concerns about these terms, please contact us:",
  },
  "pt-BR": {
    // Paginação
    paginationPrev: "Ir para a página anterior",
    paginationNext: "Ir para a próxima página",
    paginationMore: "Mais páginas",

    editProfileTitle: "Editar Perfil",
    editProfileSubtitle: "Atualize suas informações de perfil",
    pictureLabel: "Foto:",
    usernameLabel: "Nome de usuário:",
    bioLabel: "Biografia:",
    save: "Salvar",
    confirmDeleteProfile:
      "Tem certeza de que deseja excluir seu perfil? Isso não pode ser desfeito.",
    following: "Seguindo",
    likedBooks: "Livros curtidos",
    authorship: "Autoria",
    createBook: "Criar Livro",
    // Header/Footer/Main page new labels
    myAccount: "Minha Conta",
    profile: "Perfil",
    logout: "Sair",
    support: "Suporte",
    mainAuthorsTitle: "Principais Autores",
    // Títulos das seções da página principal
    mainSectionRecommended: "Recomendados para você",
    mainSectionNewReleases: "Lançamentos",
    mainSectionFanfiction: "Fanfiction",
    mainSectionOriginalStories: "Histórias Originais",
    mainSectionNovelRomance: "Romance & Novela",
    mainSectionAdventure: "Aventura",
    mainSectionTerror: "Terror",
    heroTitle: "Criar, Ler e Inspirar",
    heroSubtitle:
      "Uma plataforma onde leitores e escritores se conectam, criam e celebram a arte de contar histórias",
    getStarted: "Começar",
    forReaders: "Para Leitores",
    forWriters: "Para Escritores",
    featuresTitle: "Por que escolher Be Your Stories",
    feature1Title: "Descubra Novos Mundos",
    feature1Desc:
      "Explore milhares de histórias em diversos gêneros, de fantasia a romance, mistério a ficção científica",
    feature2Title: "Conecte-se com Autores",
    feature2Desc:
      "Interaja diretamente com seus escritores favoritos e junte-se a uma comunidade vibrante de amantes de livros",
    feature3Title: "Crie Sem Limites",
    feature3Desc:
      "Ferramentas poderosas e simples para dar vida às suas histórias e compartilhá-las com o mundo",
    ctaTitle: "Pronto para Começar sua Jornada?",
    ctaSubtitle: "Junte-se a leitores e escritores já no BYS",
    joinNow: "Junte-se Agora",
    learnMore: "Saiba Mais",
    mobileAppTitle: "Leve Suas Histórias para Qualquer Lugar",
    mobileAppSubtitle:
      "Desfrute de seus livros favoritos em qualquer lugar com nosso aplicativo móvel",
    mobileAppInf: "Disponível para iPhone/iPad e Android",
    securityTitle: "Sua Segurança é Importante para Nós",
    securitySubtitle:
      "Levamos a proteção de suas histórias e informações pessoais a sério",
    securityFeature1:
      "Seus dados são armazenados com segurança na nuvem com a mesma tecnologia confiada por grandes empresas em todo o mundo",
    securityFeature2:
      "Todas as suas informações são criptografadas e protegidas com medidas de segurança líderes do setor",
    bookTypesTitle: "Explore um Mundo de Histórias",
    bookTypesSubtitle:
      "Descubra livros em todos os gêneros para combinar com seu humor e interesses",
    bookType1: "Ficção: Fantasia, Ficção Científica, Mistério, Romance e mais",
    bookType2:
      "Não-Ficção: Biografias, Autoajuda, História e conteúdo Educacional",
    bookType3:
      "Poesia e Contos: Perfeitos para leituras rápidas e inspiração literária",
    freeAppTitle: "100% Gratuito para Usar",
    freeAppDesc:
      "Aproveite todos os recursos do Be Your Stories sem nenhum custo - ler e compartilhar histórias nunca foi tão fácil",
    login: "Entrar",
    readerAdvantage1:
      "Descubra histórias de escritores talentosos de todo o mundo",
    readerAdvantage2: "Crie listas de leitura e coleções personalizadas",
    readerAdvantage3:
      "Conecte-se com uma comunidade que compartilha seus interesses",
    writerAdvantage1:
      "Ferramentas de escrita poderosas para dar vida às suas histórias",
    writerAdvantage2: "Construa seu público e receba feedback valioso",
    writerAdvantage3: "Cresça como escritor",
    mobileAppLoginAlt: "Tela de LoginPage do Aplicativo Móvel",
    mobileAppSearchAlt: "Tela de Busca do Aplicativo Móvel",
    mobileAppHomeAlt: "Tela Inicial do Aplicativo Móvel",
    securityFeature1Content:
      "Usamos serviços de nuvem confiáveis para manter suas histórias e informações pessoais seguras e acessíveis sempre que precisar.",
    securityFeature2Content:
      "Sua privacidade é importante para nós. Usamos criptografia avançada para proteger seus dados, garantindo que apenas você controle quem pode acessar suas histórias.",
    bookType1Content:
      "Mergulhe em mundos imaginativos, aventuras emocionantes e romances calorosos criados por contadores de histórias talentosos.",
    bookType2Content:
      "Expanda seu conhecimento e obtenha insights de experiências da vida real, eventos históricos e conselhos de especialistas em vários assuntos.",
    bookType3Content:
      "Desfrute de pequenas joias literárias que condensam emoções e ideias poderosas em peças concisas e belamente elaboradas.",
    privacyPolicy: "Política de Privacidade",
    termsOfUse: "Termos de Uso",
    contact: "Contato",
    copyright: "© {year} Be Your Stories. Todos os direitos reservados.",
    addCommentButton: "Adicionar comentário",
    reading: "Lendo",
    whoAreReading: "Quem está lendo",
    whoLiked: "Quem curtiu",
    reply: "Responder",
    commentPlaceholder: "Digite seu comentário...",
    commentsEmpty: "Ainda não há comentários. Seja o primeiro a comentar!",
    formCoverLabel: "Capa:",
    formTitleLabel: "Título:",
    formDescriptionLabel: "Descrição:",
    formGenreLabel: "Gênero:",
    formSelectGenre: "Selecione o gênero",
    formAgeRangeLabel: "Faixa etária:",
    formSelectAge: "Selecione a idade",
    formCopyrightLabel: "Direitos autorais:",
    formSelectCopyright: "Selecione os direitos autorais",
    // Rótulos de opções de tags
    genreOriginal: "Original",
    genreFanfic: "Fanfic",
    genreAdventure: "Aventura",
    genreAction: "Ação",
    genreTerror: "Terror",
    genreThriller: "Suspense",
    genreHumor: "Humor",
    genreRomance: "Romance",
    genreFantasy: "Fantasia",
    ageRangeFree: "Livre",
    ageRangeTen: "+10",
    ageRangeTwelve: "+12",
    ageRangeSixteen: "+16",
    ageRangeEighteen: "+18",
    copyrightPrivate: "Privado",
    copyrightPublic: "Público",
    warningAdultery: "Adultério",
    warningAlcohol: "Álcool",
    warningBdsm: "BDSM",
    warningBisexual: "Bissexual",
    warningSensitiveContent: "Conteúdo Sensível",
    warningDrugs: "Drogas",
    warningRape: "Estupro",
    warningHeterosexual: "Heterossexual",
    warningHomosexual: "Homossexual",
    warningIntersexuality: "Intersexualidade",
    warningInappropriateLanguage: "Linguagem Inapropriada",
    warningSex: "Sexo",
    warningSpoilers: "Spoilers",
    warningSuicide: "Suicídio",
    warningTorture: "Tortura",
    warningViolence: "Violência",
    formTagsLabel: "Tags:",
    formCoauthorsLabel: "Coautores:",
    formSubmit: "Enviar",
    formSubmitting: "Enviando",
    coverPreviewAlt: "Prévia da capa",
    errorGenericTitle: "Desculpe, algo deu errado.",
    errorUnspecified: "Ocorreu um erro não especificado.",
    errorLabel: "Erro:",
    checkEmailTitle: "Verifique seu e-mail",
    resetInstructionsSent: "Instruções de redefinição de senha enviadas",
    resetEmailHint:
      "Se você se registrou com e-mail e senha, receberá um e-mail para redefinir sua senha.",
    resetYourPasswordTitle: "Redefina sua senha",
    resetPasswordSubtitle:
      "Digite seu e-mail e nós enviaremos um link para redefinir sua senha",
    emailLabel: "E-mail",
    emailPlaceholder: "m@exemplo.com",
    sending: "Enviando...",
    sendResetEmail: "Enviar e-mail de redefinição",
    alreadyHaveAccount: "Já tem uma conta?",
    loginSubtitle: "Digite seu e-mail abaixo para entrar na sua conta",
    register: "Registrar",
    passwordRequired: "A senha é obrigatória",
    passwordsDoNotMatch: "As senhas não coincidem",
    signupThanksTitle: "Obrigado por se cadastrar!",
    signupCheckEmail: "Verifique seu e-mail para confirmar",
    signupSuccessBody:
      "Você se cadastrou com sucesso. Verifique seu e-mail para confirmar sua conta antes de entrar.",
    signUp: "Cadastrar",
    createNewAccount: "Crie uma nova conta",
    enterNewPasswordBelow: "Digite sua nova senha abaixo.",
    newPasswordLabel: "Nova senha",
    saving: "Salvando...",
    saveNewPassword: "Salvar nova senha",
    creatingBookTitle: "Criando Livro",
    createChapterTitle: "Criar Capítulo",
    contentLabel: "Conteúdo:",
    updateChapterTitle: "Atualizar Capítulo",
    updatingBookTitle: "Atualizando Livro",
    chaptersTitle: "Capítulos",
    loadingSections: "Carregando seções...",
    loadingAuthors: "Carregando autores...",
    loadingComments: "Carregando comentários...",
    searchPlaceholder: "Busque por livros, usuários...",
    tagInputPlaceholder: "Digite uma tag",
    coauthorInputPlaceholder: "Digite o nome do coautor",
    filtersTitle: "Filtros",
    apply: "Aplicar",
    // Abas de busca
    tabAll: "Todos",
    tabBooks: "Livros",
    tabUsers: "Usuários",
    // Títulos das seções de filtro
    filtersGenre: "Gênero",
    filtersWarning: "Aviso",
    filtersAgeRange: "Faixa etária",
    supportNeedHelpTitle: "Precisa de ajuda?",
    supportSubtitle:
      "Se você está tendo problemas, queremos ajudar você o quanto antes!",
    supportEmailLead: "Envie-nos um e-mail para",
    subjectLabel: "Assunto:",
    send: "Enviar",
    followers: "Seguidores",
    readingList: "Lista de leitura",
    authorOf: "Autor de",
    followUserAria: "Seguir usuário",
    unfollowUserAria: "Deixar de seguir usuário",
    dontHaveAccount: "Não tem uma conta?",
    // Rótulos adicionais de autenticação/formulários
    loggingIn: "Entrando...",
    creatingAccount: "Criando conta...",
    avatarLabel: "Avatar",
    signupUsernameLabel: "Nome de usuário",
    usernamePlaceholder: "seu_usuario",
    repeatPasswordLabel: "Repetir senha",
    passwordLabel: "Senha",
    forgotPasswordLink: "Esqueceu sua senha?",
    loginWithApple: "Entrar com Apple",
    loginWithGoogle: "Entrar com Google",
    loginWithFacebook: "Entrar com Facebook",
    loginWithTwitter: "Entrar com Twitter",
    loginWithDiscord: "Entrar com Discord",
    avatarPreviewAlt: "Prévia do avatar",

    termsTitle: "Termos e Condições de Uso",
    termsSubtitle: "Informações e Avisos Legais",
    termsSection1Title: "1. Aceitação dos Termos",
    termsSection1Body:
      "Ao acessar e usar nossa plataforma, você concorda com os seguintes termos e condições. Se você não concordar com qualquer parte destes termos, não deve usar nossa plataforma.",
    termsSection2Title: "2. Uso da Plataforma",
    termsSection2Body:
      "Nossa plataforma permite que os usuários leiam e escrevam livros. Ao usar a plataforma, você concorda em usar os serviços apenas para fins legais e de acordo com os regulamentos aplicáveis. Você não pode:",
    termsSection2List1:
      "Publicar conteúdo que seja ofensivo, prejudicial, ilegal ou violador dos direitos de terceiros.",
    termsSection2List2:
      "Usar a plataforma para atividades fraudulentas ou enganosas.",
    termsSection2List3:
      "Distribuir conteúdo protegido por direitos autorais sem permissão adequada.",
    termsSection3Title: "3. Conteúdo Gerado pelo Usuário",
    termsSection3Body1:
      "Você é responsável pelo conteúdo que cria e publica em nossa plataforma. Ao submeter conteúdo, você garante que possui todos os direitos necessários para fazê-lo. A plataforma não é responsável por qualquer conteúdo gerado por usuários.",
    termsSection3Body2:
      "Ao submeter conteúdo, você concede à plataforma uma licença global, não exclusiva, livre de royalties e transferível para usar, exibir, modificar, adaptar e distribuir tal conteúdo em conexão com o funcionamento da plataforma.",
    termsSection4Title: "4. Direitos de Propriedade Intelectual",
    termsSection4Body:
      "Todo o conteúdo disponível na plataforma, incluindo textos, gráficos, logotipos, imagens e software, é propriedade da plataforma ou dos respectivos proprietários, protegido por leis de direitos autorais e propriedade intelectual. O uso não autorizado de qualquer material pode violar essas leis.",
    termsSection5Title: "5. Privacidade e Dados",
    termsSection5Body:
      "Ao usar nossa plataforma, você concorda com nossa política de privacidade. Respeitamos sua privacidade e protegemos suas informações pessoais. Não compartilharemos suas informações com terceiros, exceto conforme descrito em nossa política de privacidade.",
    termsSection6Title: "6. Restrições de Idade",
    termsSection6Body:
      "Alguns conteúdos podem ser restritos para usuários menores de 18 anos.",
    termsSection7Title: "7. Rescisão de Conta",
    termsSection7Body:
      "Reservamo-nos o direito de suspender ou encerrar sua conta a qualquer momento, sem aviso prévio, se acreditarmos que você violou qualquer um destes termos. Você também pode optar por encerrar sua conta a qualquer momento, entrando em contato conosco.",
    termsSection8Title: "8. Alterações nos Termos",
    termsSection8Body:
      "Podemos revisar e atualizar estes termos de tempos em tempos. Se fizermos alterações materiais, iremos notificá-lo por meio de nossa plataforma ou por e-mail. Seu uso contínuo da plataforma após a publicação de alterações constitui sua aceitação dos novos termos.",
    termsSection9Title: "9. Lei Aplicável",
    termsSection9Body:
      "Estes termos são regidos pelas leis do Brasil e quaisquer disputas serão resolvidas exclusivamente nos tribunais do Brasil.",
    termsSection10Title: "10. Contato",
    termsSection10Body:
      "Se você tiver quaisquer dúvidas ou preocupações sobre estes termos, entre em contato conosco:",
    termsContactEmailLabel: "E-mail:",
  },
  es: {
    // Paginación
    paginationPrev: "Ir a la página anterior",
    paginationNext: "Ir a la página siguiente",
    paginationMore: "Más páginas",

    editProfileTitle: "Editar perfil",
    editProfileSubtitle: "Actualiza la información de tu perfil",
    pictureLabel: "Foto:",
    usernameLabel: "Nombre de usuario:",
    bioLabel: "Biografía:",
    save: "Guardar",
    confirmDeleteProfile:
      "¿Estás seguro de que deseas eliminar tu perfil? Esto no se puede deshacer.",
    following: "Siguiendo",
    likedBooks: "Libros que te gustan",
    authorship: "Autoría",
    createBook: "Crear Libro",
    // Header/Footer/Main page new labels
    myAccount: "Mi Cuenta",
    profile: "Perfil",
    logout: "Cerrar sesión",
    support: "Soporte",
    mainAuthorsTitle: "Autores Principales",
    // Títulos de secciones de la página principal
    mainSectionRecommended: "Recomendado para ti",
    mainSectionNewReleases: "Nuevos Lanzamientos",
    mainSectionFanfiction: "Fanfiction",
    mainSectionOriginalStories: "Historias Originales",
    mainSectionNovelRomance: "Novela y Romance",
    mainSectionAdventure: "Aventura",
    mainSectionTerror: "Terror",
    heroTitle: "Crear, Leer y Inspirar",
    heroSubtitle:
      "Una plataforma donde lectores y escritores se conectan, crean y celebran el arte de contar historias",
    getStarted: "Comenzar",
    forReaders: "Para Lectores",
    forWriters: "Para Escritores",
    featuresTitle: "Por qué elegir Be Your Stories",
    feature1Title: "Descubre Nuevos Mundos",
    feature1Desc:
      "Explora miles de historias en todos los géneros, desde fantasía hasta romance, misterio hasta ciencia ficción",
    feature2Title: "Conéctate con Autores",
    feature2Desc:
      "Interactúa directamente con tus escritores favoritos y únete a una vibrante comunidad de amantes de los libros",
    feature3Title: "Crea Sin Límites",
    feature3Desc:
      "Herramientas potentes pero simples para dar vida a tus historias y compartirlas con el mundo",
    ctaTitle: "¿Listo para Comenzar tu Viaje?",
    ctaSubtitle: "Únete a miles de lectores y escritores ya en BYS",
    joinNow: "Únete Ahora",
    learnMore: "Saber Más",
    mobileAppTitle: "Lleva Tus Historias a Cualquier Lugar",
    mobileAppSubtitle:
      "Disfruta de tus libros favoritos en cualquier lugar con nuestra aplicación móvil",
    mobileAppInf: "Disponible para iPhone/iPad y Android",
    securityTitle: "Tu Seguridad es Importante para Nosotros",
    securitySubtitle:
      "Tomamos en serio la protección de tus historias e información personal",
    securityFeature1:
      "Tus datos se almacenan de forma segura en la nube con la misma tecnología en la que confían las principales empresas de todo el mundo",
    securityFeature2:
      "Toda tu información está cifrada y protegida con medidas de seguridad líderes en la industria",
    bookTypesTitle: "Explora un Mundo de Historias",
    bookTypesSubtitle:
      "Descubre libros en todos los géneros para que coincidan con tu estado de ánimo e intereses",
    bookType1: "Ficción: Fantasía, Ciencia Ficción, Misterio, Romance y más",
    bookType2:
      "No Ficción: Biografías, Autoayuda, Historia y contenido Educativo",
    bookType3:
      "Poesía y Cuentos Cortos: Perfectos para lecturas rápidas e inspiración literaria",
    freeAppTitle: "100% Gratis para Usar",
    freeAppDesc:
      "Disfruta de todas las funciones de Be Your Stories sin ningún costo - leer y compartir historias nunca ha sido tan fácil",
    login: "Iniciar Sesión",
    readerAdvantage1:
      "Descubre historias de escritores talentosos de todo el mundo",
    readerAdvantage2: "Crea listas de lectura y colecciones personalizadas",
    readerAdvantage3: "Conéctate con una comunidad que comparte tus intereses",
    writerAdvantage1:
      "Potentes herramientas de escritura para dar vida a tus historias",
    writerAdvantage2: "Construye tu audiencia y recibe valiosos comentarios",
    writerAdvantage3: "Crece como escritor",
    mobileAppLoginAlt: "Pantalla de Inicio de Sesión de la Aplicación Móvil",
    mobileAppSearchAlt: "Pantalla de Búsqueda de la Aplicación Móvil",
    mobileAppHomeAlt: "Pantalla de Inicio de la Aplicación Móvil",
    securityFeature1Content:
      "Utilizamos servicios en la nube de confianza para mantener tus historias e información personal seguras y accesibles cuando las necesites.",
    securityFeature2Content:
      "Tu privacidad es importante para nosotros. Utilizamos encriptación avanzada para proteger tus datos, asegurando que solo tú controles quién puede acceder a tus historias.",
    bookType1Content:
      "Sumérgete en mundos imaginativos, aventuras emocionantes y romances conmovedores creados por narradores talentosos.",
    bookType2Content:
      "Amplía tus conocimientos y obtén perspectivas de experiencias de la vida real, eventos históricos y consejos de expertos en diversos temas.",
    bookType3Content:
      "Disfruta de pequeñas joyas literarias que condensan emociones e ideas poderosas en piezas concisas y bellamente elaboradas.",
    privacyPolicy: "Política de Privacidad",
    termsOfUse: "Términos de Uso",
    contact: "Contacto",
    copyright: "© {year} Be Your Stories. Todos los derechos reservados.",
    addCommentButton: "Agregar comentario",
    reading: "Leyendo",
    whoAreReading: "Quiénes están leyendo",
    whoLiked: "Quiénes dieron Me gusta",
    reply: "Responder",
    commentPlaceholder: "Escribe tu comentario...",
    commentsEmpty: "Aún no hay comentarios. ¡Sé el primero en comentar!",
    formCoverLabel: "Portada:",
    formTitleLabel: "Título:",
    formDescriptionLabel: "Descripción:",
    formGenreLabel: "Género:",
    formSelectGenre: "Selecciona el género",
    formAgeRangeLabel: "Rango de edad:",
    formSelectAge: "Selecciona la edad",
    formCopyrightLabel: "Derechos de autor:",
    formSelectCopyright: "Selecciona los derechos de autor",
    // Etiquetas de opciones de tags
    genreOriginal: "Original",
    genreFanfic: "Fanfic",
    genreAdventure: "Aventura",
    genreAction: "Acción",
    genreTerror: "Terror",
    genreThriller: "Suspenso",
    genreHumor: "Humor",
    genreRomance: "Romance",
    genreFantasy: "Fantasía",
    ageRangeFree: "Libre",
    ageRangeTen: "+10",
    ageRangeTwelve: "+12",
    ageRangeSixteen: "+16",
    ageRangeEighteen: "+18",
    copyrightPrivate: "Privado",
    copyrightPublic: "Público",
    warningAdultery: "Adulterio",
    warningAlcohol: "Alcohol",
    warningBdsm: "BDSM",
    warningBisexual: "Bisexual",
    warningSensitiveContent: "Contenido Sensible",
    warningDrugs: "Drogas",
    warningRape: "Violación",
    warningHeterosexual: "Heterosexual",
    warningHomosexual: "Homosexual",
    warningIntersexuality: "Intersexualidad",
    warningInappropriateLanguage: "Lenguaje Inapropiado",
    warningSex: "Sexo",
    warningSpoilers: "Spoilers",
    warningSuicide: "Suicidio",
    warningTorture: "Tortura",
    warningViolence: "Violencia",
    formTagsLabel: "Etiquetas:",
    formCoauthorsLabel: "Coautores:",
    formSubmit: "Enviar",
    formSubmitting: "Enviando",
    coverPreviewAlt: "Vista previa de la portada",
    errorGenericTitle: "Lo sentimos, algo salió mal.",
    errorUnspecified: "Ocurrió un error no especificado.",
    errorLabel: "Error:",
    checkEmailTitle: "Revisa tu correo",
    resetInstructionsSent:
      "Se enviaron instrucciones para restablecer la contraseña",
    resetEmailHint:
      "Si te registraste con tu correo y contraseña, recibirás un correo para restablecer tu contraseña.",
    resetYourPasswordTitle: "Restablece tu contraseña",
    resetPasswordSubtitle:
      "Escribe tu correo y te enviaremos un enlace para restablecer tu contraseña",
    emailLabel: "Correo",
    emailPlaceholder: "m@ejemplo.com",
    sending: "Enviando...",
    sendResetEmail: "Enviar correo de restablecimiento",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    loginSubtitle: "Ingresa tu correo abajo para iniciar sesión en tu cuenta",
    register: "Registrarse",
    passwordRequired: "Se requiere contraseña",
    passwordsDoNotMatch: "Las contraseñas no coinciden",
    signupThanksTitle: "¡Gracias por registrarte!",
    signupCheckEmail: "Revisa tu correo para confirmar",
    signupSuccessBody:
      "Te has registrado con éxito. Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.",
    signUp: "Registrarse",
    createNewAccount: "Crea una nueva cuenta",
    enterNewPasswordBelow: "Ingresa tu nueva contraseña abajo.",
    newPasswordLabel: "Nueva contraseña",
    saving: "Guardando...",
    saveNewPassword: "Guardar nueva contraseña",
    creatingBookTitle: "Creando Libro",
    createChapterTitle: "Crear Capítulo",
    contentLabel: "Contenido:",
    updateChapterTitle: "Actualizar Capítulo",
    updatingBookTitle: "Actualizando Libro",
    chaptersTitle: "Capítulos",
    loadingSections: "Cargando secciones...",
    loadingAuthors: "Cargando autores...",
    loadingComments: "Cargando comentarios...",
    searchPlaceholder: "Busca libros, usuarios...",
    tagInputPlaceholder: "Ingrese etiqueta",
    coauthorInputPlaceholder: "Ingrese el nombre del coautor",
    filtersTitle: "Filtros",
    apply: "Aplicar",
    // Pestañas de búsqueda
    tabAll: "Todos",
    tabBooks: "Libros",
    tabUsers: "Usuarios",
    // Títulos de secciones de filtro
    filtersGenre: "Género",
    filtersWarning: "Advertencia",
    filtersAgeRange: "Rango de edad",
    supportNeedHelpTitle: "¿Necesitas ayuda?",
    supportSubtitle:
      "Si tienes problemas, ¡queremos ayudarte lo antes posible!",
    supportEmailLead: "Envíanos un correo a",
    subjectLabel: "Asunto:",
    send: "Enviar",
    followers: "Seguidores",
    readingList: "Lista de lectura",
    authorOf: "Autor de",
    followUserAria: "Seguir usuario",
    unfollowUserAria: "Dejar de seguir usuario",
    dontHaveAccount: "¿No tienes una cuenta?",
    // Etiquetas adicionales de auth/formularios
    loggingIn: "Iniciando sesión...",
    creatingAccount: "Creando una cuenta...",
    avatarLabel: "Avatar",
    signupUsernameLabel: "Nombre de usuario",
    usernamePlaceholder: "tu_usuario",
    repeatPasswordLabel: "Repetir contraseña",
    passwordLabel: "Contraseña",
    forgotPasswordLink: "¿Olvidaste tu contraseña?",
    loginWithApple: "Iniciar sesión con Apple",
    loginWithGoogle: "Iniciar sesión con Google",
    loginWithFacebook: "Iniciar sesión con Facebook",
    loginWithTwitter: "Iniciar sesión con Twitter",
    loginWithDiscord: "Iniciar sesión con Discord",
    avatarPreviewAlt: "Vista previa del avatar",

    termsTitle: "Términos y Condiciones de Uso",
    termsSubtitle: "Información y Avisos Legales",
    termsSection1Title: "1. Aceptación de los Términos",
    termsSection1Body:
      "Al acceder y usar nuestra plataforma, aceptas los siguientes términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestra plataforma.",
    termsSection2Title: "2. Uso de la Plataforma",
    termsSection2Body:
      "Nuestra plataforma permite a los usuarios leer y escribir libros. Al usar la plataforma, aceptas utilizar los servicios solo con fines legales y de acuerdo con las regulaciones aplicables. No debes:",
    termsSection2List1:
      "Publicar contenido que sea ofensivo, dañino, ilegal o que infrinja los derechos de terceros.",
    termsSection2List2:
      "Usar la plataforma para actividades fraudulentas o engañosas.",
    termsSection2List3:
      "Distribuir contenido protegido por derechos de autor sin el permiso adecuado.",
    termsSection3Title: "3. Contenido Generado por el Usuario",
    termsSection3Body1:
      "Eres responsable del contenido que creas y publicas en nuestra plataforma. Al enviar contenido, garantizas que posees todos los derechos necesarios para hacerlo. La plataforma no es responsable de ningún contenido generado por los usuarios.",
    termsSection3Body2:
      "Al enviar contenido, concedes a la plataforma una licencia mundial, no exclusiva, libre de regalías y transferible para usar, mostrar, modificar, adaptar y distribuir dicho contenido en relación con el funcionamiento de la plataforma.",
    termsSection4Title: "4. Derechos de Propiedad Intelectual",
    termsSection4Body:
      "Todo el contenido disponible en la plataforma, incluidos textos, gráficos, logotipos, imágenes y software, es propiedad de la plataforma o de sus respectivos propietarios, protegido por leyes de derechos de autor y propiedad intelectual. El uso no autorizado de cualquier material puede violar estas leyes.",
    termsSection5Title: "5. Privacidad y Datos",
    termsSection5Body:
      "Al usar nuestra plataforma, aceptas nuestra política de privacidad. Respetamos tu privacidad y protegemos tu información personal. No compartiremos tu información con terceros, excepto según lo descrito en nuestra política de privacidad.",
    termsSection6Title: "6. Restricciones de Edad",
    termsSection6Body:
      "Algunos contenidos pueden estar restringidos para usuarios menores de 18 años.",
    termsSection7Title: "7. Terminación de la Cuenta",
    termsSection7Body:
      "Nos reservamos el derecho de suspender o terminar tu cuenta en cualquier momento, sin previo aviso, si creemos que has violado alguno de estos términos. También puedes optar por cerrar tu cuenta en cualquier momento contactándonos.",
    termsSection8Title: "8. Cambios en los Términos",
    termsSection8Body:
      "Podemos revisar y actualizar estos términos de vez en cuando. Si realizamos cambios materiales, te notificaremos a través de nuestra plataforma o por correo electrónico. Tu uso continuo de la plataforma después de la publicación de los cambios constituye tu aceptación de los nuevos términos.",
    termsSection9Title: "9. Ley Aplicable",
    termsSection9Body:
      "Estos términos se rigen por las leyes de Brasil y cualquier disputa se resolverá exclusivamente en los tribunales de Brasil.",
    termsSection10Title: "10. Contacto",
    termsSection10Body:
      "Si tienes preguntas o inquietudes sobre estos términos, contáctanos:",
    termsContactEmailLabel: "Correo:",
  },
  de: {
    // Paginierung
    paginationPrev: "Zur vorherigen Seite",
    paginationNext: "Zur nächsten Seite",
    paginationMore: "Weitere Seiten",

    editProfileTitle: "Profil bearbeiten",
    editProfileSubtitle: "Aktualisiere deine Profilinformationen",
    pictureLabel: "Bild:",
    usernameLabel: "Benutzername:",
    bioLabel: "Biografie:",
    save: "Speichern",
    confirmDeleteProfile:
      "Bist du sicher, dass du dein Profil löschen möchtest? Dies kann nicht rückgängig gemacht werden.",
    following: "Folgt",
    likedBooks: "Favorisierte Bücher",
    authorship: "Autorschaft",
    createBook: "Buch erstellen",
    // Header/Footer/Main page new labels
    myAccount: "Mein Konto",
    profile: "Profil",
    logout: "Abmelden",
    support: "Support",
    mainAuthorsTitle: "Hauptautoren",
    // Hauptseitensektionen
    mainSectionRecommended: "Empfohlen für dich",
    mainSectionNewReleases: "Neuerscheinungen",
    mainSectionFanfiction: "Fanfiction",
    mainSectionOriginalStories: "Originalgeschichten",
    mainSectionNovelRomance: "Roman & Romantik",
    mainSectionAdventure: "Abenteuer",
    mainSectionTerror: "Horror",
    heroTitle: "Kreieren, Lesen und Inspirieren",
    heroSubtitle:
      "Eine Plattform, auf der Leser und Autoren sich verbinden, erschaffen und die Kunst des Geschichtenerzählens feiern",
    getStarted: "Loslegen",
    forReaders: "Für Leser",
    forWriters: "Für Autoren",
    featuresTitle: "Warum Be Your Stories wählen",
    feature1Title: "Entdecke neue Welten",
    feature1Desc:
      "Erkunde tausende Geschichten aller Genres, von Fantasy bis Romantik, Krimi bis Science-Fiction",
    feature2Title: "Verbinde dich mit Autoren",
    feature2Desc:
      "Tausche dich direkt mit deinen Lieblingsautoren aus und werde Teil einer lebendigen Gemeinschaft von Buchliebhabern",
    feature3Title: "Erschaffe ohne Grenzen",
    feature3Desc:
      "Leistungsstarke und dennoch einfache Tools, um deine Geschichten zum Leben zu erwecken und mit der Welt zu teilen",
    ctaTitle: "Bereit, deine Reise zu beginnen?",
    ctaSubtitle:
      "Schließe dich tausenden Lesern und Autoren an, die bereits bei BYS sind",
    joinNow: "Jetzt Beitreten",
    learnMore: "Mehr Erfahren",
    mobileAppTitle: "Nimm deine Geschichten überall mit",
    mobileAppSubtitle:
      "Genieße deine Lieblingsbücher unterwegs mit unserer mobilen App",
    mobileAppInf: "Verfügbar für iPhone/iPad und Android",
    securityTitle: "Deine Sicherheit ist uns wichtig",
    securitySubtitle:
      "Wir nehmen den Schutz deiner Geschichten und persönlichen Daten ernst",
    securityFeature1:
      "Deine Daten werden sicher in der Cloud gespeichert, mit der gleichen Technologie, der große Unternehmen weltweit vertrauen",
    securityFeature2:
      "Alle deine Informationen sind verschlüsselt und mit branchenführenden Sicherheitsmaßnahmen geschützt",
    bookTypesTitle: "Entdecke eine Welt voller Geschichten",
    bookTypesSubtitle:
      "Finde Bücher in jedem Genre, passend zu deiner Stimmung und deinen Interessen",
    bookType1: "Fiktion: Fantasy, Science-Fiction, Krimi, Romantik und mehr",
    bookType2:
      "Sachbücher: Biografien, Selbsthilfe, Geschichte und Bildungsinhalte",
    bookType3:
      "Poesie und Kurzgeschichten: Perfekt für schnelle Lektüre und literarische Inspiration",
    freeAppTitle: "100% Kostenlos",
    freeAppDesc:
      "Genieße alle Funktionen von Be Your Stories ohne jegliche Kosten - Geschichten lesen und teilen war noch nie so einfach",
    login: "Anmelden",
    readerAdvantage1:
      "Entdecke Geschichten von talentierten Autoren aus aller Welt",
    readerAdvantage2: "Erstelle personalisierte Leselisten und Sammlungen",
    readerAdvantage3:
      "Verbinde dich mit einer Gemeinschaft, die deine Interessen teilt",
    writerAdvantage1:
      "Leistungsstarke Schreibwerkzeuge, um deine Geschichten zum Leben zu erwecken",
    writerAdvantage2: "Baue dein Publikum auf und erhalte wertvolles Feedback",
    writerAdvantage3: "Wachse als Autor",
    mobileAppLoginAlt: "Anmeldebildschirm der mobilen App",
    mobileAppSearchAlt: "Suchbildschirm der mobilen App",
    mobileAppHomeAlt: "Startbildschirm der mobilen App",
    securityFeature1Content:
      "Wir nutzen vertrauenswürdige Cloud-Dienste, um deine Geschichten und persönlichen Informationen sicher und jederzeit zugänglich zu halten.",
    securityFeature2Content:
      "Deine Privatsphäre ist uns wichtig. Wir verwenden fortschrittliche Verschlüsselung zum Schutz deiner Daten und stellen sicher, dass nur du kontrollierst, wer auf deine Geschichten zugreifen kann.",
    bookType1Content:
      "Tauche ein in fantasievolle Welten, spannende Abenteuer und herzerwärmende Romanzen, die von talentierten Geschichtenerzählern geschaffen wurden.",
    bookType2Content:
      "Erweitere dein Wissen und gewinne Einblicke aus realen Erfahrungen, historischen Ereignissen und Expertenratschlägen zu verschiedenen Themen.",
    bookType3Content:
      "Genieße kleine literarische Juwelen, die kraftvolle Emotionen und Ideen in prägnante, wunderschön gestaltete Stücke packen.",
    privacyPolicy: "Datenschutzrichtlinie",
    termsOfUse: "Nutzungsbedingungen",
    contact: "Kontakt",
    copyright: "© {year} Be Your Stories. Alle Rechte vorbehalten.",
    addCommentButton: "Kommentar hinzufügen",
    reading: "Lesen",
    whoAreReading: "Wer liest",
    whoLiked: "Wem es gefällt",
    reply: "Antworten",
    commentPlaceholder: "Schreibe deinen Kommentar...",
    commentsEmpty: "Noch keine Kommentare. Sei der Erste, der kommentiert!",
    formCoverLabel: "Cover:",
    formTitleLabel: "Titel:",
    formDescriptionLabel: "Beschreibung:",
    formGenreLabel: "Genre:",
    formSelectGenre: "Genre auswählen",
    formAgeRangeLabel: "Altersgruppe:",
    formSelectAge: "Alter auswählen",
    formCopyrightLabel: "Urheberrecht:",
    formSelectCopyright: "Urheberrecht auswählen",
    // Tag-Optionsbezeichnungen
    genreOriginal: "Original",
    genreFanfic: "Fanfic",
    genreAdventure: "Abenteuer",
    genreAction: "Action",
    genreTerror: "Horror",
    genreThriller: "Thriller",
    genreHumor: "Humor",
    genreRomance: "Romantik",
    genreFantasy: "Fantasy",
    ageRangeFree: "Frei",
    ageRangeTen: "+10",
    ageRangeTwelve: "+12",
    ageRangeSixteen: "+16",
    ageRangeEighteen: "+18",
    copyrightPrivate: "Privat",
    copyrightPublic: "Öffentlich",
    warningAdultery: "Ehebruch",
    warningAlcohol: "Alkohol",
    warningBdsm: "BDSM",
    warningBisexual: "Bisexuell",
    warningSensitiveContent: "Sensible Inhalte",
    warningDrugs: "Drogen",
    warningRape: "Vergewaltigung",
    warningHeterosexual: "Heterosexuell",
    warningHomosexual: "Homosexuell",
    warningIntersexuality: "Intersexualität",
    warningInappropriateLanguage: "Unangemessene Sprache",
    warningSex: "Sex",
    warningSpoilers: "Spoiler",
    warningSuicide: "Selbstmord",
    warningTorture: "Folter",
    warningViolence: "Gewalt",
    formTagsLabel: "Tags:",
    formCoauthorsLabel: "Miturheber:",
    formSubmit: "Senden",
    formSubmitting: "Senden...",
    coverPreviewAlt: "Cover-Vorschau",
    errorGenericTitle: "Entschuldigung, etwas ist schiefgelaufen.",
    errorUnspecified: "Ein nicht spezifizierter Fehler ist aufgetreten.",
    errorLabel: "Fehler:",
    checkEmailTitle: "Überprüfe deine E-Mail",
    resetInstructionsSent:
      "Anweisungen zum Zurücksetzen des Passworts gesendet",
    resetEmailHint:
      "Wenn du dich mit E-Mail und Passwort registriert hast, erhältst du eine E-Mail zum Zurücksetzen deines Passworts.",
    resetYourPasswordTitle: "Setze dein Passwort zurück",
    resetPasswordSubtitle:
      "Gib deine E-Mail ein und wir senden dir einen Link zum Zurücksetzen deines Passworts",
    emailLabel: "E-Mail",
    emailPlaceholder: "m@beispiel.com",
    sending: "Senden...",
    sendResetEmail: "E-Mail zum Zurücksetzen senden",
    alreadyHaveAccount: "Du hast bereits ein Konto?",
    loginSubtitle:
      "Gib unten deine E-Mail ein, um dich bei deinem Konto anzumelden",
    register: "Registrieren",
    passwordRequired: "Passwort ist erforderlich",
    passwordsDoNotMatch: "Passwörter stimmen nicht überein",
    signupThanksTitle: "Danke für deine Registrierung!",
    signupCheckEmail: "Überprüfe deine E-Mail zur Bestätigung",
    signupSuccessBody:
      "Du hast dich erfolgreich registriert. Bitte überprüfe deine E-Mail, um dein Konto zu bestätigen, bevor du dich anmeldest.",
    signUp: "Registrieren",
    createNewAccount: "Erstelle ein neues Konto",
    enterNewPasswordBelow: "Gib unten dein neues Passwort ein.",
    newPasswordLabel: "Neues Passwort",
    saving: "Speichern...",
    saveNewPassword: "Neues Passwort speichern",
    creatingBookTitle: "Buch wird erstellt",
    createChapterTitle: "Kapitel erstellen",
    contentLabel: "Inhalt:",
    updateChapterTitle: "Kapitel aktualisieren",
    updatingBookTitle: "Buch wird aktualisiert",
    chaptersTitle: "Kapitel",
    loadingSections: "Abschnitte werden geladen...",
    loadingAuthors: "Autoren werden geladen...",
    loadingComments: "Kommentare werden geladen...",
    searchPlaceholder: "Suche nach Büchern, Nutzern...",
    tagInputPlaceholder: "Tag eingeben",
    coauthorInputPlaceholder: "Co-Autor-Namen eingeben",
    filtersTitle: "Filter",
    apply: "Anwenden",
    // Such-Tabs
    tabAll: "Alle",
    tabBooks: "Bücher",
    tabUsers: "Benutzer",
    // Filterabschnitt-Titel
    filtersGenre: "Genre",
    filtersWarning: "Warnung",
    filtersAgeRange: "Altersgruppe",
    supportNeedHelpTitle: "Brauchst du Hilfe?",
    supportSubtitle:
      "Wenn du auf Probleme stößt, möchten wir dir so schnell wie möglich helfen!",
    supportEmailLead: "Schick uns eine E-Mail an",
    subjectLabel: "Betreff:",
    send: "Senden",
    followers: "Follower",
    readingList: "Leseliste",
    authorOf: "Autor von",
    followUserAria: "Benutzer folgen",
    unfollowUserAria: "Benutzer nicht mehr folgen",
    dontHaveAccount: "Du hast noch kein Konto?",
    // Zusätzliche Auth-/Formularbeschriftungen
    loggingIn: "Anmeldung läuft...",
    creatingAccount: "Konto wird erstellt...",
    avatarLabel: "Avatar",
    signupUsernameLabel: "Benutzername",
    usernamePlaceholder: "dein_benutzername",
    repeatPasswordLabel: "Passwort wiederholen",
    passwordLabel: "Passwort",
    forgotPasswordLink: "Passwort vergessen?",
    loginWithApple: "Mit Apple anmelden",
    loginWithGoogle: "Mit Google anmelden",
    loginWithFacebook: "Mit Facebook anmelden",
    loginWithTwitter: "Mit Twitter anmelden",
    loginWithDiscord: "Mit Discord anmelden",
    avatarPreviewAlt: "Avatar-Vorschau",

    termsTitle: "Nutzungsbedingungen",
    termsSubtitle: "Rechtliche Informationen & Hinweise",
    termsSection1Title: "1. Zustimmung zu den Bedingungen",
    termsSection1Body:
      "Durch den Zugriff auf und die Nutzung unserer Plattform stimmst du den folgenden Bedingungen zu. Wenn du mit einem Teil dieser Bedingungen nicht einverstanden bist, solltest du unsere Plattform nicht nutzen.",
    termsSection2Title: "2. Nutzung der Plattform",
    termsSection2Body:
      "Unsere Plattform ermöglicht es Nutzern, Bücher zu lesen und zu schreiben. Durch die Nutzung der Plattform stimmst du zu, die Dienste nur für rechtmäßige Zwecke und in Übereinstimmung mit den geltenden Vorschriften zu verwenden. Du darfst nicht:",
    termsSection2List1:
      "Inhalte veröffentlichen, die anstößig, schädlich, illegal sind oder die Rechte Dritter verletzen.",
    termsSection2List2:
      "Die Plattform für betrügerische oder irreführende Aktivitäten nutzen.",
    termsSection2List3:
      "Urheberrechtlich geschützte Inhalte ohne entsprechende Genehmigung verbreiten.",
    termsSection3Title: "3. Von Nutzern erstellte Inhalte",
    termsSection3Body1:
      "Du bist für die Inhalte verantwortlich, die du auf unserer Plattform erstellst und veröffentlichst. Mit dem Einreichen von Inhalten gewährleistest du, dass du alle erforderlichen Rechte dafür besitzt. Die Plattform ist nicht für von Nutzern erstellte Inhalte verantwortlich.",
    termsSection3Body2:
      "Mit dem Einreichen von Inhalten räumst du der Plattform eine weltweite, nicht-exklusive, gebührenfreie und übertragbare Lizenz ein, solche Inhalte im Zusammenhang mit dem Betrieb der Plattform zu nutzen, anzuzeigen, zu ändern, anzupassen und zu verbreiten.",
    termsSection4Title: "4. Rechte an geistigem Eigentum",
    termsSection4Body:
      "Alle auf der Plattform verfügbaren Inhalte, einschließlich Texte, Grafiken, Logos, Bilder und Software, sind Eigentum der Plattform oder der jeweiligen Eigentümer und durch Urheber- und geistige Eigentumsrechte geschützt. Die unbefugte Nutzung jeglichen Materials kann diese Gesetze verletzen.",
    termsSection5Title: "5. Datenschutz und Daten",
    termsSection5Body:
      "Durch die Nutzung unserer Plattform stimmst du unserer Datenschutzrichtlinie zu. Wir respektieren deine Privatsphäre und schützen deine persönlichen Daten. Wir geben deine Informationen nicht an Dritte weiter, außer wie in unserer Datenschutzrichtlinie beschrieben.",
    termsSection6Title: "6. Altersbeschränkungen",
    termsSection6Body:
      "Einige Inhalte können für Nutzer unter 18 Jahren eingeschränkt sein.",
    termsSection7Title: "7. Kontokündigung",
    termsSection7Body:
      "Wir behalten uns das Recht vor, dein Konto jederzeit und ohne vorherige Ankündigung zu sperren oder zu kündigen, wenn wir der Ansicht sind, dass du gegen eine dieser Bedingungen verstoßen hast. Du kannst dein Konto auch jederzeit schließen, indem du uns kontaktierst.",
    termsSection8Title: "8. Änderungen der Bedingungen",
    termsSection8Body:
      "Wir können diese Bedingungen von Zeit zu Zeit überarbeiten und aktualisieren. Wenn wir wesentliche Änderungen vornehmen, benachrichtigen wir dich über unsere Plattform oder per E-Mail. Deine fortgesetzte Nutzung der Plattform nach der Veröffentlichung der Änderungen gilt als Zustimmung zu den neuen Bedingungen.",
    termsSection9Title: "9. Anwendbares Recht",
    termsSection9Body:
      "Diese Bedingungen unterliegen den Gesetzen Brasiliens und alle Streitigkeiten werden ausschließlich vor den Gerichten Brasiliens beigelegt.",
    termsSection10Title: "10. Kontakt",
    termsSection10Body:
      "Wenn du Fragen oder Bedenken zu diesen Bedingungen hast, kontaktiere uns bitte:",
    termsContactEmailLabel: "E-Mail:",
  },
};

export const useTranslation = (language: Language) => {
  return {
    t: (key: TranslationKey) =>
      translations[language][key] ?? translations["en"][key] ?? key,
  } as const;
};
