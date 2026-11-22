/* ============================================================
   CONTENIDO DEL PORTFOLIO  ·  edita aquí todo lo que se muestra
   ============================================================
   IDIOMAS: cualquier texto puede ser
     - un string normal → igual en todos los idiomas  ('Docker')
     - L(en, es, fr, pt, de, ja) → un texto por idioma
     Si falta un idioma se usa el inglés.

   Estructura:
   - categories: el halo de categorías (en orden).
     · id, label, icon, start (ítem inicial, opcional)
     · items: la columna vertical de cada categoría.
   - Cada item:
     · title, subtitle, icon
     · panel: lo que se ve al abrirlo. Bloques opcionales:
         kicker, title, subtitle, avatar (iniciales), photo, image,
         body: [párrafos], stats: [{value,label}], tags: [...],
         bars: [{name, level(0-100)}], timeline: [{date,title,place,text}],
         links: [{label, url, icon, download?, newTab?}], pdf: 'ruta.pdf' (visor)
     · action: 'sound' | 'cursor' | 'theme' | 'lang' | 'reboot'  (solo en Ajustes)
   Iconos: user, folder, chip, briefcase, cap, mail, gear, star, heart,
   image, code, server, monitor, cube, gamepad, globe, book, award,
   file, card, branch, sound, palette, power, info, rocket, database,
   wrench, phone, translate, cursor, cloud, pipeline, chart, cards, location
   ============================================================ */

window.PORTFOLIO = (() => {
  const L = (en, es, fr, pt, de, ja) => ({ en, es, fr, pt, de, ja });

  const VIEW_CODE = L('View code', 'Ver código', 'Voir le code', 'Ver código', 'Code ansehen', 'コードを見る');
  const NETWORKING = L('Networking', 'Redes', 'Réseaux', 'Redes', 'Netzwerke', 'ネットワーク');
  const GH = 'https://github.com/sergioglezz';

  return {
    owner: {
      name: 'Sergio González Castilla',
      initials: 'SG',
    },

    startCategory: 'profile',

    categories: [
      /* ───────────────────────── SETTINGS ───────────────────────── */
      {
        id: 'settings',
        label: L('Settings', 'Ajustes', 'Paramètres', 'Configurações', 'Einstellungen', '設定'),
        icon: 'gear',
        items: [
          { title: L('Language', 'Idioma', 'Langue', 'Idioma', 'Sprache', '言語'), icon: 'translate', action: 'lang' },
          { title: L('Sound', 'Sonido', 'Son', 'Som', 'Ton', 'サウンド'), icon: 'sound', action: 'sound' },
          { title: L('Cursor effects', 'Efectos del cursor', 'Effets du curseur', 'Efeitos do cursor', 'Cursor-Effekte', 'カーソル効果'), icon: 'cursor', action: 'cursor' },
          {
            title: L('Background theme', 'Tema del fondo', 'Thème du fond', 'Tema do fundo', 'Hintergrund', '背景テーマ'),
            subtitle: L('Change the colour of the waves', 'Cambia el color de las ondas', 'Change la couleur des vagues', 'Muda a cor das ondas', 'Farbe der Wellen ändern', '波の色を変更'),
            icon: 'palette', action: 'theme',
          },
          {
            title: L('Replay startup', 'Repetir arranque', 'Rejouer le démarrage', 'Repetir abertura', 'Start wiederholen', '起動をもう一度'),
            subtitle: L('Watch the intro animation again', 'Vuelve a ver la animación de inicio', 'Revoir l’animation d’intro', 'Ver de novo a animação inicial', 'Startanimation erneut ansehen', '起動アニメーションを再生'),
            icon: 'power', action: 'reboot',
          },
          {
            title: L('About this site', 'Acerca de esta web', 'À propos du site', 'Sobre este site', 'Über diese Seite', 'このサイトについて'),
            subtitle: L('How it was made', 'Cómo está hecha', 'Comment il est fait', 'Como foi feito', 'Wie sie gemacht ist', '制作について'),
            icon: 'info',
            panel: {
              title: L('About this site', 'Acerca de esta web', 'À propos du site', 'Sobre este site', 'Über diese Seite', 'このサイトについて'),
              body: [
                L(
                  'Portfolio with an interface inspired by 2000s console menus: categories on a rotating 3D halo, options listed vertically and a wave background that changes colour every month.',
                  'Portfolio con una interfaz inspirada en los menús de consola de los 2000: categorías en un halo 3D giratorio, opciones en vertical y un fondo de ondas que cambia de color cada mes.',
                  'Portfolio avec une interface inspirée des menus de console des années 2000 : catégories sur un halo 3D rotatif, options à la verticale et un fond de vagues qui change de couleur chaque mois.',
                  'Portfólio com uma interface inspirada nos menus de console dos anos 2000: categorias em um halo 3D giratório, opções na vertical e um fundo de ondas que muda de cor a cada mês.',
                  'Portfolio mit einer Oberfläche im Stil der Konsolenmenüs der 2000er: Kategorien auf einem rotierenden 3D-Halo, Optionen vertikal und ein Wellenhintergrund, der jeden Monat die Farbe wechselt.',
                  '2000年代のゲーム機メニューにインスパイアされたポートフォリオ。カテゴリーは回転する3Dの輪に並び、項目は縦に表示され、背景の波は毎月色が変わります。'
                ),
                L(
                  'Handmade with HTML, CSS and JavaScript, no frameworks. The background is a WebGL shader, the sounds are synthesised in real time with the Web Audio API, and it is served with Docker + Nginx.',
                  'Hecha a mano con HTML, CSS y JavaScript sin frameworks. El fondo es un shader WebGL, los sonidos se sintetizan en tiempo real con Web Audio API y se sirve con Docker + Nginx.',
                  'Fait main en HTML, CSS et JavaScript, sans framework. Le fond est un shader WebGL, les sons sont synthétisés en temps réel avec la Web Audio API, et le site est servi avec Docker + Nginx.',
                  'Feito à mão com HTML, CSS e JavaScript, sem frameworks. O fundo é um shader WebGL, os sons são sintetizados em tempo real com a Web Audio API e o site é servido com Docker + Nginx.',
                  'Handgemacht mit HTML, CSS und JavaScript, ohne Frameworks. Der Hintergrund ist ein WebGL-Shader, die Sounds entstehen in Echtzeit mit der Web Audio API, ausgeliefert mit Docker + Nginx.',
                  'フレームワークを使わず、HTML・CSS・JavaScriptで手作り。背景はWebGLシェーダー、サウンドはWeb Audio APIでリアルタイムに合成し、Docker + Nginxで配信しています。'
                ),
              ],
              tags: ['HTML', 'CSS', 'JavaScript', 'WebGL', 'Web Audio', 'Docker', 'Nginx'],
              links: [{ label: VIEW_CODE, url: `${GH}/Portfolio`, icon: 'branch' }],
            },
          },
        ],
      },

      /* ───────────────────────── PROFILE ───────────────────────── */
      {
        id: 'profile',
        label: L('Profile', 'Perfil', 'Profil', 'Perfil', 'Profil', 'プロフィール'),
        icon: 'user',
        items: [
          {
            title: 'Sergio González Castilla',
            subtitle: L('Full Stack Developer · Android & Cloud', 'Desarrollador Full Stack · Android y Cloud', 'Développeur Full Stack · Android & Cloud', 'Desenvolvedor Full Stack · Android e Cloud', 'Full-Stack-Entwickler · Android & Cloud', 'フルスタック開発者・Android & クラウド'),
            icon: 'user',
            panel: {
              avatar: 'SG',
              title: 'Sergio González Castilla',
              subtitle: L(
                'Full Stack Developer · Android & Cloud · DevOps — Algeciras, Spain',
                'Desarrollador Full Stack · Android y Cloud · DevOps — Algeciras, España',
                'Développeur Full Stack · Android & Cloud · DevOps — Algésiras, Espagne',
                'Desenvolvedor Full Stack · Android e Cloud · DevOps — Algeciras, Espanha',
                'Full-Stack-Entwickler · Android & Cloud · DevOps — Algeciras, Spanien',
                'フルスタック開発者・Android & クラウド・DevOps — スペイン・アルヘシラス'
              ),
              body: [
                L(
                  'Full Stack Developer specialised in Android (Kotlin/Java) with a solid foundation in cloud and infrastructure as code. I combine real experience building apps with integrated AI, open-source contributions and Azure deployments with Terraform, Ansible and Kubernetes.',
                  'Desarrollador Full Stack especializado en Android (Kotlin/Java) y con una sólida base en cloud e infraestructura como código. Combino experiencia real desarrollando aplicaciones con IA integrada, contribuciones a proyectos open source y despliegues en Azure con Terraform, Ansible y Kubernetes.',
                  'Développeur Full Stack spécialisé en Android (Kotlin/Java), avec une solide base en cloud et en infrastructure as code. J’allie une expérience concrète d’applications intégrant l’IA, des contributions open source et des déploiements sur Azure avec Terraform, Ansible et Kubernetes.',
                  'Desenvolvedor Full Stack especializado em Android (Kotlin/Java), com uma base sólida em cloud e infraestrutura como código. Combino experiência real no desenvolvimento de apps com IA integrada, contribuições para projetos open source e implantações no Azure com Terraform, Ansible e Kubernetes.',
                  'Full-Stack-Entwickler mit Schwerpunkt Android (Kotlin/Java) und solider Basis in Cloud und Infrastructure as Code. Ich verbinde praktische Erfahrung mit KI-gestützten Apps, Open-Source-Beiträgen und Azure-Deployments mit Terraform, Ansible und Kubernetes.',
                  'Android（Kotlin/Java）を専門とするフルスタック開発者で、クラウドとInfrastructure as Codeにも強みがあります。AIを組み込んだアプリ開発、オープンソースへの貢献、Terraform・Ansible・KubernetesによるAzureへのデプロイの実務経験があります。'
                ),
                L(
                  'Azure certified (AZ-900), used to agile teams, and able to build a feature and take it all the way to production without depending on another team.',
                  'Certificado en Azure (AZ-900), acostumbrado a equipos ágiles y capaz de desarrollar una funcionalidad y llevarla a producción sin depender de otro equipo.',
                  'Certifié Azure (AZ-900), habitué aux équipes agiles et capable de développer une fonctionnalité puis de la mettre en production sans dépendre d’une autre équipe.',
                  'Certificado em Azure (AZ-900), acostumado a equipes ágeis e capaz de desenvolver uma funcionalidade e levá-la à produção sem depender de outra equipe.',
                  'Azure-zertifiziert (AZ-900), an agile Teams gewöhnt und in der Lage, ein Feature zu entwickeln und ohne ein anderes Team in Produktion zu bringen.',
                  'Azure認定（AZ-900）を取得。アジャイルなチームでの開発に慣れており、機能の開発から本番環境へのデプロイまで他チームに頼らず完結できます。'
                ),
              ],
              stats: [
                { value: '10+', label: L('Projects on GitHub', 'Proyectos en GitHub', 'Projets sur GitHub', 'Projetos no GitHub', 'Projekte auf GitHub', 'GitHubのプロジェクト') },
                { value: 'AZ-900', label: L('Microsoft Azure certified', 'Certificado Microsoft Azure', 'Certifié Microsoft Azure', 'Certificado Microsoft Azure', 'Microsoft-Azure-zertifiziert', 'Microsoft Azure認定') },
                { value: 'B2', label: L('English · Cambridge FCE', 'Inglés · Cambridge FCE', 'Anglais · Cambridge FCE', 'Inglês · Cambridge FCE', 'Englisch · Cambridge FCE', '英語・Cambridge FCE') },
              ],
            },
          },
          {
            title: L('Availability', 'Disponibilidad', 'Disponibilité', 'Disponibilidade', 'Verfügbarkeit', '稼働状況'),
            subtitle: L('Open to remote and on-site work', 'Abierto a trabajo remoto y presencial', 'Ouvert au télétravail et au présentiel', 'Aberto a trabalho remoto e presencial', 'Offen für Remote- und Vor-Ort-Arbeit', 'リモート・出社どちらも可'),
            icon: 'rocket',
            panel: {
              title: L('Availability', 'Disponibilidad', 'Disponibilité', 'Disponibilidade', 'Verfügbarkeit', '稼働状況'),
              body: [L(
                'Open to Android, Full Stack and DevOps/Cloud roles, remote or on-site. Right now I am going deeper into CI/CD with Jenkins, serverless on AWS and infrastructure as code on Azure.',
                'Abierto a puestos Android, Full Stack y DevOps/Cloud, en remoto o presencial. Ahora mismo estoy profundizando en CI/CD con Jenkins, serverless en AWS e infraestructura como código en Azure.',
                'Ouvert aux postes Android, Full Stack et DevOps/Cloud, en télétravail ou sur site. En ce moment, j’approfondis le CI/CD avec Jenkins, le serverless sur AWS et l’infrastructure as code sur Azure.',
                'Aberto a vagas Android, Full Stack e DevOps/Cloud, remotas ou presenciais. No momento, estou me aprofundando em CI/CD com Jenkins, serverless na AWS e infraestrutura como código no Azure.',
                'Offen für Android-, Full-Stack- und DevOps/Cloud-Stellen, remote oder vor Ort. Derzeit vertiefe ich CI/CD mit Jenkins, Serverless auf AWS und Infrastructure as Code auf Azure.',
                'Android、フルスタック、DevOps/クラウドの職種に、リモート・出社問わず応募可能です。現在はJenkinsによるCI/CD、AWSのサーバーレス、AzureでのIaCを深めています。'
              )],
              tags: ['Android', 'Full Stack', 'DevOps', 'Cloud', L('Remote', 'Remoto', 'Télétravail', 'Remoto', 'Remote', 'リモート')],
            },
          },
          {
            title: L('Interests', 'Intereses', 'Centres d’intérêt', 'Interesses', 'Interessen', '興味'),
            subtitle: L('Beyond work', 'Más allá del trabajo', 'Au-delà du travail', 'Além do trabalho', 'Abseits der Arbeit', '仕事以外のこと'),
            icon: 'heart',
            panel: {
              title: L('Interests', 'Intereses', 'Centres d’intérêt', 'Interesses', 'Interessen', '興味'),
              body: [L(
                'I enjoy tinkering with my own home server, designing interfaces and making video games: I have collaborated on Roblox projects doing UI/UX, art and game logic in Lua.',
                'Me gusta trastear con mi propio servidor en casa, diseñar interfaces y hacer videojuegos: he colaborado en proyectos de Roblox con UI/UX, arte y lógica de juego en Lua.',
                'J’aime bricoler mon propre serveur à la maison, concevoir des interfaces et créer des jeux vidéo : j’ai collaboré à des projets Roblox (UI/UX, graphismes et logique de jeu en Lua).',
                'Gosto de mexer no meu próprio servidor em casa, desenhar interfaces e criar videogames: colaborei em projetos de Roblox com UI/UX, arte e lógica de jogo em Lua.',
                'Ich bastle gern an meinem eigenen Heimserver, gestalte Oberflächen und entwickle Videospiele: Bei Roblox-Projekten habe ich an UI/UX, Grafik und Spiellogik in Lua mitgearbeitet.',
                '自宅サーバーをいじったり、UIをデザインしたり、ゲームを作ったりするのが好きです。RobloxのプロジェクトではUI/UX、アート、Luaによるゲームロジックを担当しました。'
              )],
              tags: [
                L('Game development', 'Desarrollo de videojuegos', 'Développement de jeux', 'Desenvolvimento de jogos', 'Spieleentwicklung', 'ゲーム開発'),
                'Self-hosting',
                L('UI design', 'Diseño UI', 'Design UI', 'Design de UI', 'UI-Design', 'UIデザイン'),
                'Cloud', 'Open source',
              ],
            },
          },
        ],
      },

      /* ───────────────────────── PROJECTS ───────────────────────── */
      {
        id: 'projects',
        label: L('Projects', 'Proyectos', 'Projets', 'Projetos', 'Projekte', 'プロジェクト'),
        icon: 'folder',
        items: [
          {
            title: 'FitTimer',
            subtitle: L('Android app with integrated AI', 'App Android con IA integrada', 'App Android avec IA intégrée', 'App Android com IA integrada', 'Android-App mit integrierter KI', 'AI搭載Androidアプリ'),
            icon: 'phone',
            panel: {
              title: 'FitTimer',
              subtitle: L('2024 · Final degree project (DAM · CENEC Málaga)', '2024 · TFG (DAM · CENEC Málaga)', '2024 · Projet de fin d’études (DAM · CENEC Málaga)', '2024 · TCC (DAM · CENEC Málaga)', '2024 · Abschlussprojekt (DAM · CENEC Málaga)', '2024年・卒業制作（DAM・CENEC Málaga）'),
              body: [
                L(
                  'Complete Android app built as my final degree project. It integrates the Gemini API as a conversational personal trainer, with active content filters.',
                  'Aplicación Android completa desarrollada como TFG. Integra la API de Gemini como entrenador personal conversacional, con filtros de contenido activos.',
                  'Application Android complète réalisée comme projet de fin d’études. Elle intègre l’API Gemini comme coach personnel conversationnel, avec des filtres de contenu actifs.',
                  'App Android completo desenvolvido como TCC. Integra a API do Gemini como personal trainer conversacional, com filtros de conteúdo ativos.',
                  'Vollständige Android-App, entwickelt als Abschlussprojekt. Sie bindet die Gemini-API als dialogfähigen Personal Trainer ein, mit aktiven Inhaltsfiltern.',
                  '卒業制作として開発した本格的なAndroidアプリ。Gemini APIを対話型パーソナルトレーナーとして組み込み、コンテンツフィルターも備えています。'
                ),
                L(
                  'Weekly planner with persistent drag & drop, recipe catalogue by nutritional goal, BMI calculator with progress history and SHA-256 hashed authentication. I handled the whole cycle: architecture, frontend and backend.',
                  'Planificador semanal con drag & drop persistente, catálogo de recetas por objetivo nutricional, calculadora de IMC con historial de evolución y autenticación con hash SHA-256. Gestioné todo el ciclo: arquitectura, frontend y backend.',
                  'Planning hebdomadaire avec glisser-déposer persistant, catalogue de recettes par objectif nutritionnel, calculateur d’IMC avec historique et authentification hachée en SHA-256. J’ai géré tout le cycle : architecture, frontend et backend.',
                  'Planejador semanal com arrastar e soltar persistente, catálogo de receitas por objetivo nutricional, calculadora de IMC com histórico de evolução e autenticação com hash SHA-256. Cuidei de todo o ciclo: arquitetura, frontend e backend.',
                  'Wochenplaner mit dauerhaftem Drag & Drop, Rezeptkatalog nach Ernährungsziel, BMI-Rechner mit Verlauf und Authentifizierung mit SHA-256-Hash. Ich habe den gesamten Zyklus übernommen: Architektur, Frontend und Backend.',
                  'ドラッグ＆ドロップで保存できる週間プランナー、栄養目標別のレシピ集、履歴付きBMI計算機、SHA-256ハッシュによる認証を搭載。設計からフロントエンド、バックエンドまで全工程を担当しました。'
                ),
              ],
              tags: ['Kotlin', 'Java', 'Gemini API', 'SQLite', 'Android Studio'],
              links: [{ label: VIEW_CODE, url: `${GH}/FitTimer-TFG`, icon: 'branch' }],
            },
          },
          {
            title: L('Azure cloud infrastructure', 'Infraestructura cloud en Azure', 'Infrastructure cloud sur Azure', 'Infraestrutura cloud no Azure', 'Cloud-Infrastruktur auf Azure', 'Azureクラウドインフラ'),
            subtitle: 'Terraform · Ansible · AKS',
            icon: 'cloud',
            panel: {
              title: L('Azure cloud infrastructure', 'Infraestructura cloud en Azure', 'Infrastructure cloud sur Azure', 'Infraestrutura cloud no Azure', 'Cloud-Infrastruktur auf Azure', 'Azureクラウドインフラ'),
              subtitle: L('Infrastructure as code', 'Infraestructura como código', 'Infrastructure as code', 'Infraestrutura como código', 'Infrastructure as Code', 'Infrastructure as Code'),
              body: [
                L(
                  'A 100% automated, reproducible deployment on Microsoft Azure: from zero to an application in production with a single command and no manual steps.',
                  'Despliegue 100 % automatizado y reproducible en Microsoft Azure: desde cero hasta una aplicación en producción con un solo comando y sin pasos manuales.',
                  'Déploiement 100 % automatisé et reproductible sur Microsoft Azure : de zéro à une application en production en une seule commande, sans étape manuelle.',
                  'Implantação 100% automatizada e reproduzível no Microsoft Azure: do zero a uma aplicação em produção com um único comando e sem passos manuais.',
                  '100 % automatisiertes, reproduzierbares Deployment auf Microsoft Azure: von null bis zur Anwendung in Produktion mit einem einzigen Befehl, ohne manuelle Schritte.',
                  'Microsoft Azureへの完全自動化・再現可能なデプロイ。コマンド1つで、手作業なしにゼロから本番アプリまで構築します。'
                ),
                L(
                  'Terraform defines 12 resources (VNet, Ubuntu VM, NSG, public IP, ACR and an AKS cluster) and Ansible configures and deploys with 3 roles. An Nginx container with SSL and basic auth runs on the VM, and Redis 6 with persistent storage runs on Kubernetes.',
                  'Terraform define 12 recursos (VNet, VM Ubuntu, NSG, IP pública, ACR y clúster AKS) y Ansible configura y despliega con 3 roles. Un contenedor Nginx con SSL y autenticación básica corre en la VM, y Redis 6 con almacenamiento persistente en Kubernetes.',
                  'Terraform définit 12 ressources (VNet, VM Ubuntu, NSG, IP publique, ACR et cluster AKS) et Ansible configure et déploie avec 3 rôles. Un conteneur Nginx avec SSL et authentification basique tourne sur la VM, et Redis 6 avec stockage persistant sur Kubernetes.',
                  'O Terraform define 12 recursos (VNet, VM Ubuntu, NSG, IP pública, ACR e cluster AKS) e o Ansible configura e implanta com 3 roles. Um contêiner Nginx com SSL e autenticação básica roda na VM, e o Redis 6 com armazenamento persistente no Kubernetes.',
                  'Terraform definiert 12 Ressourcen (VNet, Ubuntu-VM, NSG, öffentliche IP, ACR und AKS-Cluster), Ansible konfiguriert und deployt mit 3 Rollen. Ein Nginx-Container mit SSL und Basic Auth läuft auf der VM, Redis 6 mit persistentem Speicher auf Kubernetes.',
                  'Terraformで12のリソース（VNet、Ubuntu VM、NSG、パブリックIP、ACR、AKSクラスター）を定義し、Ansibleの3つのロールで構成・デプロイ。VMではSSLとベーシック認証付きのNginxコンテナが、Kubernetesでは永続ストレージ付きのRedis 6が動作します。'
                ),
              ],
              tags: ['Terraform', 'Ansible', 'AKS', 'Docker', 'Podman', 'Azure'],
              links: [{ label: VIEW_CODE, url: `${GH}/demo-azure-terraform`, icon: 'branch' }],
            },
          },
          {
            title: L('Serverless API on AWS', 'API serverless en AWS', 'API serverless sur AWS', 'API serverless na AWS', 'Serverless-API auf AWS', 'AWSのサーバーレスAPI'),
            subtitle: 'Lambda · DynamoDB · Jenkins',
            icon: 'database',
            panel: {
              title: L('Serverless API on AWS', 'API serverless en AWS', 'API serverless sur AWS', 'API serverless na AWS', 'Serverless-API auf AWS', 'AWSのサーバーレスAPI'),
              subtitle: 'CI/CD',
              body: [
                L(
                  'TODO REST API built with AWS Lambda, API Gateway and DynamoDB, with no servers to manage. All the infrastructure is defined as code in an AWS SAM template.',
                  'API REST de lista de tareas construida con AWS Lambda, API Gateway y DynamoDB, sin servidores que administrar. Toda la infraestructura está definida como código en una plantilla de AWS SAM.',
                  'API REST de liste de tâches construite avec AWS Lambda, API Gateway et DynamoDB, sans serveur à administrer. Toute l’infrastructure est définie en code dans un modèle AWS SAM.',
                  'API REST de lista de tarefas construída com AWS Lambda, API Gateway e DynamoDB, sem servidores para administrar. Toda a infraestrutura está definida como código em um template do AWS SAM.',
                  'TODO-REST-API mit AWS Lambda, API Gateway und DynamoDB – ganz ohne zu verwaltende Server. Die gesamte Infrastruktur ist als Code in einer AWS-SAM-Vorlage definiert.',
                  'AWS Lambda・API Gateway・DynamoDBで構築したTODOのREST API。管理すべきサーバーはなく、インフラはすべてAWS SAMテンプレートでコード化しています。'
                ),
                L(
                  'Full delivery cycle with Jenkins: every change is analysed, deployed to staging and tested against the real API; if everything passes, it is merged and deployed to production.',
                  'Ciclo de entrega completo con Jenkins: cada cambio se analiza, se despliega en staging y se prueba contra la API real; si todo pasa, se fusiona y se despliega en producción.',
                  'Cycle de livraison complet avec Jenkins : chaque changement est analysé, déployé en staging et testé contre l’API réelle ; si tout passe, il est fusionné et déployé en production.',
                  'Ciclo de entrega completo com Jenkins: cada mudança é analisada, implantada em staging e testada contra a API real; se tudo passar, é mesclada e implantada em produção.',
                  'Vollständiger Delivery-Zyklus mit Jenkins: Jede Änderung wird analysiert, auf Staging deployt und gegen die echte API getestet; besteht alles, wird sie gemergt und in Produktion deployt.',
                  'Jenkinsによる完全なデリバリーサイクル。変更ごとに静的解析、ステージングへのデプロイ、実APIへのテストを行い、すべて通ればマージして本番へデプロイします。'
                ),
              ],
              tags: ['Python', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'AWS SAM', 'Jenkins'],
              links: [{ label: VIEW_CODE, url: `${GH}/demo-aws-serverless-cicd`, icon: 'branch' }],
            },
          },
          {
            title: L('Jenkins pipeline', 'Pipeline de Jenkins', 'Pipeline Jenkins', 'Pipeline do Jenkins', 'Jenkins-Pipeline', 'Jenkinsパイプライン'),
            subtitle: 'Flask · pytest · JMeter',
            icon: 'pipeline',
            panel: {
              title: L('Jenkins pipeline', 'Pipeline de Jenkins', 'Pipeline Jenkins', 'Pipeline do Jenkins', 'Jenkins-Pipeline', 'Jenkinsパイプライン'),
              subtitle: 'DevOps & Cloud · UNIR',
              body: [
                L(
                  'A simple calculator API in Python + Flask used as the base for a Jenkins pipeline covering every usual type of test: unit, service (WireMock), static (flake8), security (bandit), coverage and performance (JMeter).',
                  'Una API de calculadora sencilla en Python + Flask que sirve de base para un pipeline de Jenkins con todos los tipos de prueba habituales: unitarias, de servicio (WireMock), estáticas (flake8), de seguridad (bandit), de cobertura y de rendimiento (JMeter).',
                  'Une API de calculatrice simple en Python + Flask servant de base à un pipeline Jenkins couvrant tous les types de tests habituels : unitaires, de service (WireMock), statiques (flake8), de sécurité (bandit), de couverture et de performance (JMeter).',
                  'Uma API de calculadora simples em Python + Flask que serve de base para um pipeline do Jenkins com todos os tipos de teste habituais: unitários, de serviço (WireMock), estáticos (flake8), de segurança (bandit), de cobertura e de desempenho (JMeter).',
                  'Eine einfache Rechner-API in Python + Flask als Basis für eine Jenkins-Pipeline mit allen üblichen Testarten: Unit-, Service- (WireMock), statische (flake8), Sicherheits- (bandit), Coverage- und Performance-Tests (JMeter).',
                  'Python + Flaskのシンプルな電卓APIをベースに、単体・サービス（WireMock）・静的解析（flake8）・セキュリティ（bandit）・カバレッジ・性能（JMeter）のテストを行うJenkinsパイプラインを構築。'
                ),
                L(
                  'Two versions: one on a single agent and another that spreads the work across three agents and runs quality and service tests in parallel.',
                  'Dos versiones: una en un solo agente y otra que reparte el trabajo entre tres agentes y ejecuta en paralelo las pruebas de calidad y las de servicio.',
                  'Deux versions : l’une sur un seul agent, l’autre répartissant le travail sur trois agents et exécutant en parallèle les tests de qualité et de service.',
                  'Duas versões: uma em um único agente e outra que distribui o trabalho entre três agentes e executa em paralelo os testes de qualidade e de serviço.',
                  'Zwei Varianten: eine auf einem einzigen Agenten und eine, die die Arbeit auf drei Agenten verteilt und Qualitäts- und Servicetests parallel ausführt.',
                  '1つのエージェントで動く版と、3つのエージェントに処理を分散し品質テストとサービステストを並列実行する版の2種類があります。'
                ),
              ],
              tags: ['Python', 'Flask', 'Jenkins', 'pytest', 'WireMock', 'JMeter'],
              links: [{ label: VIEW_CODE, url: `${GH}/demo-jenkins-pipeline`, icon: 'branch' }],
            },
          },
          {
            title: 'SaaS-O-Matic',
            subtitle: 'FastAPI · Angular',
            icon: 'chart',
            panel: {
              title: 'SaaS-O-Matic',
              subtitle: L('Technical test · AI spec-driven development', 'Prueba técnica · Desarrollo guiado por especificaciones con IA', 'Test technique · Développement piloté par les spécifications avec l’IA', 'Teste técnico · Desenvolvimento guiado por especificações com IA', 'Technischer Test · Spec-Driven Development mit KI', '技術課題・AIを活用した仕様駆動開発'),
              body: [
                L(
                  'Internal tool for a sales team to register corporate clients, simulate their monthly SaaS subscription (tiered pricing per user plus their country’s tax) and see the amounts in their preferred currency.',
                  'Herramienta interna para que un equipo comercial registre clientes corporativos, simule su suscripción SaaS mensual (precio por tramos de usuarios más el impuesto de su país) y vea los importes en la divisa que prefiera.',
                  'Outil interne permettant à une équipe commerciale d’enregistrer des clients entreprises, de simuler leur abonnement SaaS mensuel (tarif par paliers d’utilisateurs plus la taxe de leur pays) et d’afficher les montants dans la devise souhaitée.',
                  'Ferramenta interna para uma equipe comercial cadastrar clientes corporativos, simular a assinatura SaaS mensal (preço por faixas de usuários mais o imposto do país) e ver os valores na moeda que preferir.',
                  'Internes Tool, mit dem ein Vertriebsteam Firmenkunden erfasst, deren monatliches SaaS-Abo simuliert (gestaffelter Preis pro Nutzer plus Steuer des Landes) und die Beträge in der gewünschten Währung anzeigt.',
                  '営業チームが法人顧客を登録し、月額SaaS料金（ユーザー数による段階料金＋国ごとの税）をシミュレーションして、好きな通貨で金額を確認できる社内ツール。'
                ),
                L(
                  'REST API in Python with FastAPI and SQLite plus an Angular dashboard: Spanish tax ID validation (DNI, NIE, CIF), a live invoice simulator with history and five currencies.',
                  'API REST en Python con FastAPI y SQLite y un dashboard en Angular: validación de DNI, NIE y CIF, simulador de factura en tiempo real con historial y cinco divisas.',
                  'API REST en Python avec FastAPI et SQLite, et un tableau de bord Angular : validation des identifiants fiscaux espagnols (DNI, NIE, CIF), simulateur de facture en temps réel avec historique et cinq devises.',
                  'API REST em Python com FastAPI e SQLite e um dashboard em Angular: validação de DNI, NIE e CIF, simulador de fatura em tempo real com histórico e cinco moedas.',
                  'REST-API in Python mit FastAPI und SQLite sowie ein Angular-Dashboard: Prüfung spanischer Steuernummern (DNI, NIE, CIF), Live-Rechnungssimulator mit Verlauf und fünf Währungen.',
                  'FastAPIとSQLiteによるPythonのREST APIとAngularのダッシュボード。スペインの税番号（DNI・NIE・CIF）の検証、履歴付きのリアルタイム請求シミュレーター、5通貨に対応。'
                ),
              ],
              tags: ['Python', 'FastAPI', 'SQLite', 'Angular'],
              links: [{ label: VIEW_CODE, url: `${GH}/saas-o-matic`, icon: 'branch' }],
            },
          },
          {
            title: 'Hoppscotch',
            subtitle: L('Open-source contribution · SOAP', 'Contribución open source · SOAP', 'Contribution open source · SOAP', 'Contribuição open source · SOAP', 'Open-Source-Beitrag · SOAP', 'オープンソース貢献・SOAP'),
            icon: 'code',
            panel: {
              title: 'Hoppscotch',
              subtitle: '2024 · Nowo.tech',
              body: [L(
                'I implemented working SOAP support in Hoppscotch, the open-source API testing tool, contributing directly to the project’s GitHub repository. It makes the tool useful for teams that work with legacy SOAP services.',
                'Implementé soporte SOAP funcional en Hoppscotch, la herramienta open source de pruebas de APIs, contribuyendo directamente a su repositorio en GitHub. La hace útil para equipos que trabajan con servicios SOAP heredados.',
                'J’ai implémenté un support SOAP fonctionnel dans Hoppscotch, l’outil open source de test d’API, en contribuant directement à son dépôt GitHub. L’outil devient utile aux équipes qui travaillent avec des services SOAP historiques.',
                'Implementei suporte SOAP funcional no Hoppscotch, a ferramenta open source de testes de APIs, contribuindo diretamente para o repositório do projeto no GitHub. Isso torna a ferramenta útil para equipes que trabalham com serviços SOAP legados.',
                'Ich habe funktionierende SOAP-Unterstützung in Hoppscotch, dem Open-Source-Tool zum Testen von APIs, implementiert und direkt zum GitHub-Repository beigetragen. So wird das Tool für Teams mit älteren SOAP-Diensten nutzbar.',
                'オープンソースのAPIテストツールHoppscotchにSOAP対応を実装し、GitHubのリポジトリに直接コントリビュートしました。レガシーなSOAPサービスを扱うチームでも使えるようになりました。'
              )],
              tags: ['JavaScript', 'SOAP', 'REST APIs', 'Open source'],
              links: [{ label: L('View fork', 'Ver fork', 'Voir le fork', 'Ver fork', 'Fork ansehen', 'フォークを見る'), url: `${GH}/hoppscotch`, icon: 'branch' }],
            },
          },
          {
            title: 'Blackjack Helper',
            subtitle: 'Spring Boot · React',
            icon: 'cards',
            panel: {
              title: 'Blackjack Helper',
              subtitle: L('Practice project', 'Proyecto de práctica', 'Projet d’entraînement', 'Projeto de prática', 'Übungsprojekt', '練習プロジェクト'),
              body: [L(
                'Web blackjack game: a Spring Boot backend manages the rules and exposes a REST API that decides whether the player wins, loses or ties against the dealer; the React frontend shows the cards, the controls and the results.',
                'Juego de blackjack web: un backend en Spring Boot gestiona las reglas y expone una API REST que decide si el jugador gana, pierde o empata contra la banca; el frontend en React muestra las cartas, los controles y los resultados.',
                'Jeu de blackjack web : un backend Spring Boot gère les règles et expose une API REST qui détermine si le joueur gagne, perd ou fait égalité contre la banque ; le frontend React affiche les cartes, les commandes et les résultats.',
                'Jogo de blackjack web: um backend em Spring Boot gerencia as regras e expõe uma API REST que decide se o jogador ganha, perde ou empata contra a banca; o frontend em React mostra as cartas, os controles e os resultados.',
                'Blackjack-Webspiel: Ein Spring-Boot-Backend verwaltet die Regeln und stellt eine REST-API bereit, die entscheidet, ob der Spieler gegen die Bank gewinnt, verliert oder unentschieden spielt; das React-Frontend zeigt Karten, Steuerung und Ergebnisse.',
                'Webで遊べるブラックジャック。Spring Bootのバックエンドがルールを管理し、勝ち・負け・引き分けを判定するREST APIを提供。Reactのフロントエンドでカードや操作ボタン、結果を表示します。'
              )],
              tags: ['Java 17', 'Spring Boot', 'Maven', 'React', 'JavaScript'],
              links: [{ label: VIEW_CODE, url: `${GH}/BlackJackHelper`, icon: 'branch' }],
            },
          },
          {
            title: 'Home Server',
            subtitle: 'Ubuntu Server · Self-hosted',
            icon: 'server',
            panel: {
              title: 'Home Server',
              subtitle: L('Personal project', 'Proyecto personal', 'Projet personnel', 'Projeto pessoal', 'Persönliches Projekt', '個人プロジェクト'),
              body: [L(
                'Ubuntu Server installed and configured on my own hardware to host personal projects and practise Linux, networking and system administration in real conditions.',
                'Ubuntu Server instalado y configurado en hardware propio para alojar proyectos personales y practicar con Linux, redes y administración de sistemas en condiciones reales.',
                'Ubuntu Server installé et configuré sur mon propre matériel pour héberger des projets personnels et pratiquer Linux, les réseaux et l’administration système en conditions réelles.',
                'Ubuntu Server instalado e configurado em hardware próprio para hospedar projetos pessoais e praticar Linux, redes e administração de sistemas em condições reais.',
                'Ubuntu Server auf eigener Hardware installiert und eingerichtet, um persönliche Projekte zu hosten und Linux, Netzwerke und Systemadministration unter realen Bedingungen zu üben.',
                '自前のハードウェアにUbuntu Serverを導入・設定し、個人プロジェクトをホスティングしながら、Linux・ネットワーク・システム管理を実環境で実践しています。'
              )],
              tags: ['Linux', 'Ubuntu Server', NETWORKING],
            },
          },
          {
            title: L('Video games — Roblox', 'Videojuegos — Roblox', 'Jeux vidéo — Roblox', 'Videogames — Roblox', 'Videospiele — Roblox', 'ゲーム開発 — Roblox'),
            subtitle: 'Lua · UI/UX · Game Design',
            icon: 'gamepad',
            panel: {
              title: L('Video games — Roblox', 'Videojuegos — Roblox', 'Jeux vidéo — Roblox', 'Videogames — Roblox', 'Videospiele — Roblox', 'ゲーム開発 — Roblox'),
              subtitle: L('Collaboration', 'Colaboración', 'Collaboration', 'Colaboração', 'Zusammenarbeit', '共同制作'),
              body: [L(
                'Collaboration on video game projects: interface design (UI/UX), art and game logic in Lua, working as a team with version control.',
                'Colaboración en proyectos de videojuegos: diseño de interfaces (UI/UX), arte y lógica de juego en Lua, trabajando en equipo con control de versiones.',
                'Collaboration à des projets de jeux vidéo : conception d’interfaces (UI/UX), graphismes et logique de jeu en Lua, en équipe et avec gestion de versions.',
                'Colaboração em projetos de videogames: design de interfaces (UI/UX), arte e lógica de jogo em Lua, trabalhando em equipe com controle de versão.',
                'Mitarbeit an Videospielprojekten: Interface-Design (UI/UX), Grafik und Spiellogik in Lua, im Team und mit Versionskontrolle.',
                'ゲーム開発プロジェクトに参加し、UI/UXデザイン、アート、Luaによるゲームロジックを担当。バージョン管理を使ったチーム開発を経験しました。'
              )],
              tags: ['Lua', 'UI/UX', 'Game Design'],
            },
          },
          {
            title: L('This portfolio', 'Este portfolio', 'Ce portfolio', 'Este portfólio', 'Dieses Portfolio', 'このポートフォリオ'),
            subtitle: 'HTML · CSS · JavaScript · WebGL',
            icon: 'monitor',
            panel: {
              title: L('This portfolio', 'Este portfolio', 'Ce portfolio', 'Este portfólio', 'Dieses Portfolio', 'このポートフォリオ'),
              subtitle: '2026',
              body: [L(
                'Console-menu style portfolio with a startup animation, a WebGL shader background, synthesised sounds, six languages and a custom cursor. No frameworks, served with Docker + Nginx.',
                'Portfolio con estilo de menú de consola, animación de arranque, fondo con shader WebGL, sonidos sintetizados, seis idiomas y cursor personalizado. Sin frameworks, servido con Docker + Nginx.',
                'Portfolio façon menu de console, avec animation de démarrage, fond en shader WebGL, sons synthétisés, six langues et curseur personnalisé. Sans framework, servi avec Docker + Nginx.',
                'Portfólio no estilo de menu de console, com animação de abertura, fundo com shader WebGL, sons sintetizados, seis idiomas e cursor personalizado. Sem frameworks, servido com Docker + Nginx.',
                'Portfolio im Stil eines Konsolenmenüs mit Startanimation, WebGL-Shader-Hintergrund, synthetisierten Sounds, sechs Sprachen und eigenem Cursor. Ohne Frameworks, ausgeliefert mit Docker + Nginx.',
                'ゲーム機メニュー風のポートフォリオ。起動アニメーション、WebGLシェーダーの背景、合成サウンド、6言語対応、カスタムカーソルを搭載。フレームワーク不使用、Docker + Nginxで配信。'
              )],
              tags: ['HTML', 'CSS', 'JavaScript', 'WebGL', 'Docker', 'Nginx'],
              links: [{ label: VIEW_CODE, url: `${GH}/Portfolio`, icon: 'branch' }],
            },
          },
        ],
      },

      /* ───────────────────────── SKILLS ───────────────────────── */
      {
        id: 'skills',
        label: L('Skills', 'Skills', 'Compétences', 'Habilidades', 'Skills', 'スキル'),
        icon: 'chip',
        items: [
          {
            title: L('Programming languages', 'Lenguajes', 'Langages', 'Linguagens', 'Programmiersprachen', 'プログラミング言語'),
            subtitle: 'Kotlin · Java · JavaScript · Python',
            icon: 'code',
            panel: {
              title: L('Programming languages', 'Lenguajes', 'Langages', 'Linguagens', 'Programmiersprachen', 'プログラミング言語'),
              tags: ['Kotlin', 'Java', 'JavaScript', 'Python', 'SQL', 'HTML', 'CSS', 'Lua'],
            },
          },
          {
            title: 'Android', subtitle: 'Android Studio · Material Design · Firebase', icon: 'phone',
            panel: { title: 'Android', tags: ['Android Studio', 'Material Design', 'SQLite', 'Gemini API', 'Firebase'] },
          },
          {
            title: L('Backend', 'Backend', 'Backend', 'Backend', 'Backend', 'バックエンド'), subtitle: 'Spring Boot · REST · SOAP', icon: 'database',
            panel: {
              title: L('Backend', 'Backend', 'Backend', 'Backend', 'Backend', 'バックエンド'),
              tags: ['Spring Boot', 'REST APIs', 'SOAP', 'FastAPI', 'Flask', L('Node.js (basic)', 'Node.js (básico)', 'Node.js (notions)', 'Node.js (básico)', 'Node.js (Grundlagen)', 'Node.js（基礎）')],
            },
          },
          {
            title: L('Cloud', 'Cloud', 'Cloud', 'Cloud', 'Cloud', 'クラウド'), subtitle: 'Azure · AWS · AKS', icon: 'cloud',
            panel: {
              title: L('Cloud', 'Cloud', 'Cloud', 'Cloud', 'Cloud', 'クラウド'),
              tags: ['Microsoft Azure (AZ-900)', 'AWS', 'Azure Kubernetes Service', 'AWS Lambda', 'DynamoDB'],
            },
          },
          {
            title: 'DevOps / IaC', subtitle: 'Docker · Terraform · Kubernetes', icon: 'cube',
            panel: { title: 'DevOps / IaC', tags: ['Docker', 'Terraform', 'Ansible', 'Podman', 'Kubernetes', 'Jenkins', 'CI/CD'] },
          },
          {
            title: L('Tools & methods', 'Herramientas y metodologías', 'Outils et méthodes', 'Ferramentas e metodologias', 'Tools & Methoden', 'ツールと手法'),
            subtitle: 'Git · Scrum · Code Review',
            icon: 'wrench',
            panel: {
              title: L('Tools & methods', 'Herramientas y metodologías', 'Outils et méthodes', 'Ferramentas e metodologias', 'Tools & Methoden', 'ツールと手法'),
              tags: ['Git', 'GitHub', 'VS Code', 'Android Studio', 'Scrum', 'Agile', 'Code Review'],
            },
          },
          {
            title: L('Systems', 'Sistemas', 'Systèmes', 'Sistemas', 'Systeme', 'システム'), subtitle: 'Linux · Windows', icon: 'monitor',
            panel: { title: L('Systems', 'Sistemas', 'Systèmes', 'Sistemas', 'Systeme', 'システム'), tags: ['Linux (Ubuntu Server)', 'Windows 10/11'] },
          },
          {
            title: L('Design', 'Diseño', 'Design', 'Design', 'Design', 'デザイン'), subtitle: 'Figma · GIMP · Affinity', icon: 'palette',
            panel: { title: L('Design', 'Diseño', 'Design', 'Design', 'Design', 'デザイン'), tags: ['Figma', 'GIMP', 'Affinity', 'UI/UX'] },
          },
          {
            title: L('Languages', 'Idiomas', 'Langues', 'Idiomas', 'Sprachen', '語学'),
            subtitle: L('Spanish · English B2', 'Español · Inglés B2', 'Espagnol · Anglais B2', 'Espanhol · Inglês B2', 'Spanisch · Englisch B2', 'スペイン語・英語B2'),
            icon: 'globe',
            panel: {
              title: L('Languages', 'Idiomas', 'Langues', 'Idiomas', 'Sprachen', '語学'),
              tags: [
                L('Spanish — native', 'Español — nativo', 'Espagnol — langue maternelle', 'Espanhol — nativo', 'Spanisch — Muttersprache', 'スペイン語 — ネイティブ'),
                L('English — B2 (Cambridge FCE)', 'Inglés — B2 (Cambridge FCE)', 'Anglais — B2 (Cambridge FCE)', 'Inglês — B2 (Cambridge FCE)', 'Englisch — B2 (Cambridge FCE)', '英語 — B2（Cambridge FCE）'),
              ],
            },
          },
        ],
      },

      /* ───────────────────────── EXPERIENCE ───────────────────────── */
      {
        id: 'experience',
        label: L('Experience', 'Experiencia', 'Expérience', 'Experiência', 'Erfahrung', '職歴'),
        icon: 'briefcase',
        items: [
          {
            title: L('Multiplatform App Developer', 'Desarrollador de Aplicaciones Multiplataforma', 'Développeur d’applications multiplateformes', 'Desenvolvedor de Aplicações Multiplataforma', 'Entwickler für plattformübergreifende Apps', 'マルチプラットフォームアプリ開発者'),
            subtitle: L('Nowo.tech · Mar – May 2024', 'Nowo.tech · mar – may 2024', 'Nowo.tech · mars – mai 2024', 'Nowo.tech · mar – mai 2024', 'Nowo.tech · März – Mai 2024', 'Nowo.tech・2024年3月〜5月'),
            icon: 'briefcase',
            panel: {
              title: L('Multiplatform App Developer', 'Desarrollador de Aplicaciones Multiplataforma', 'Développeur d’applications multiplateformes', 'Desenvolvedor de Aplicações Multiplataforma', 'Entwickler für plattformübergreifende Apps', 'マルチプラットフォームアプリ開発者'),
              subtitle: L('Nowo.tech · Mar – May 2024', 'Nowo.tech · mar – may 2024', 'Nowo.tech · mars – mai 2024', 'Nowo.tech · mar – mai 2024', 'Nowo.tech · März – Mai 2024', 'Nowo.tech・2024年3月〜5月'),
              body: [
                L(
                  'Implemented working SOAP support in Hoppscotch (open source), contributing directly to the project’s GitHub repository.',
                  'Implementé soporte SOAP funcional en Hoppscotch (open source), contribuyendo directamente al repositorio del proyecto en GitHub.',
                  'Implémentation d’un support SOAP fonctionnel dans Hoppscotch (open source), avec contribution directe au dépôt GitHub du projet.',
                  'Implementei suporte SOAP funcional no Hoppscotch (open source), contribuindo diretamente para o repositório do projeto no GitHub.',
                  'Funktionierende SOAP-Unterstützung in Hoppscotch (Open Source) implementiert, mit direktem Beitrag zum GitHub-Repository des Projekts.',
                  'オープンソースのHoppscotchにSOAP対応を実装し、プロジェクトのGitHubリポジトリに直接貢献。'
                ),
                L(
                  'Reduced integration validation time by improving the team’s API testing workflow.',
                  'Reduje el tiempo de validación de integraciones mejorando el flujo de pruebas de APIs del equipo.',
                  'Réduction du temps de validation des intégrations grâce à l’amélioration du flux de tests d’API de l’équipe.',
                  'Reduzi o tempo de validação de integrações melhorando o fluxo de testes de APIs da equipe.',
                  'Validierungszeit von Integrationen verkürzt, indem ich den API-Test-Workflow des Teams verbessert habe.',
                  'チームのAPIテストの流れを改善し、連携の検証時間を短縮。'
                ),
                L(
                  'Worked in an agile environment with short delivery cycles, code reviews and Git version control.',
                  'Desarrollé en un entorno ágil con ciclos cortos de entrega, revisiones de código y control de versiones con Git.',
                  'Développement en environnement agile avec des cycles de livraison courts, des revues de code et Git.',
                  'Desenvolvi em um ambiente ágil com ciclos curtos de entrega, revisões de código e controle de versão com Git.',
                  'Entwicklung in einem agilen Umfeld mit kurzen Release-Zyklen, Code-Reviews und Versionskontrolle mit Git.',
                  '短いリリースサイクル、コードレビュー、Gitによるバージョン管理のアジャイル環境で開発。'
                ),
              ],
              tags: ['JavaScript', 'SOAP', 'REST APIs', 'Git', 'Agile'],
            },
          },
          {
            title: L('Systems & Networks Technician', 'Técnico en Sistemas Microinformáticos y Redes', 'Technicien systèmes et réseaux', 'Técnico em Sistemas Microinformáticos e Redes', 'Techniker für Systeme und Netzwerke', 'システム・ネットワーク技術者'),
            subtitle: L('Partida Logistics · Apr – Jun 2022', 'Partida Logistics · abr – jun 2022', 'Partida Logistics · avr. – juin 2022', 'Partida Logistics · abr – jun 2022', 'Partida Logistics · Apr. – Juni 2022', 'Partida Logistics・2022年4月〜6月'),
            icon: 'wrench',
            panel: {
              title: L('Systems & Networks Technician', 'Técnico en Sistemas Microinformáticos y Redes', 'Technicien systèmes et réseaux', 'Técnico em Sistemas Microinformáticos e Redes', 'Techniker für Systeme und Netzwerke', 'システム・ネットワーク技術者'),
              subtitle: L('Partida Logistics · Apr – Jun 2022', 'Partida Logistics · abr – jun 2022', 'Partida Logistics · avr. – juin 2022', 'Partida Logistics · abr – jun 2022', 'Partida Logistics · Apr. – Juni 2022', 'Partida Logistics・2022年4月〜6月'),
              body: [
                L(
                  'Preventive and corrective maintenance of networks and systems in a real production environment.',
                  'Mantenimiento preventivo y correctivo de redes y sistemas en un entorno productivo real.',
                  'Maintenance préventive et corrective des réseaux et systèmes dans un environnement de production réel.',
                  'Manutenção preventiva e corretiva de redes e sistemas em um ambiente de produção real.',
                  'Vorbeugende und korrigierende Wartung von Netzwerken und Systemen im echten Produktivbetrieb.',
                  '実際の本番環境でのネットワークとシステムの予防保守・修正保守。'
                ),
                L(
                  'Diagnosis and resolution of hardware and software incidents, reducing response time with optimised configurations.',
                  'Diagnóstico y resolución de incidencias de hardware y software, reduciendo el tiempo de respuesta con configuraciones optimizadas.',
                  'Diagnostic et résolution d’incidents matériels et logiciels, avec un temps de réponse réduit grâce à des configurations optimisées.',
                  'Diagnóstico e resolução de incidentes de hardware e software, reduzindo o tempo de resposta com configurações otimizadas.',
                  'Diagnose und Behebung von Hardware- und Softwarestörungen, mit kürzeren Reaktionszeiten durch optimierte Konfigurationen.',
                  'ハードウェア・ソフトウェアの障害を診断・解決し、設定の最適化で対応時間を短縮。'
                ),
              ],
              tags: ['Hardware', NETWORKING, 'Windows', L('Technical support', 'Soporte técnico', 'Support technique', 'Suporte técnico', 'Technischer Support', 'テクニカルサポート')],
            },
          },
          {
            title: L('Freelance web developer', 'Desarrollador web freelance', 'Développeur web freelance', 'Desenvolvedor web freelance', 'Freelance-Webentwickler', 'フリーランスWeb開発者'),
            subtitle: L('For a startup', 'Para una startup', 'Pour une startup', 'Para uma startup', 'Für ein Startup', 'スタートアップ向け'),
            icon: 'globe',
            panel: {
              title: L('Freelance web developer', 'Desarrollador web freelance', 'Développeur web freelance', 'Desenvolvedor web freelance', 'Freelance-Webentwickler', 'フリーランスWeb開発者'),
              subtitle: L('For a startup', 'Para una startup', 'Pour une startup', 'Para uma startup', 'Für ein Startup', 'スタートアップ向け'),
              body: [L(
                'Web pages for a startup, covering the whole front-end cycle: layout, responsive design and feature integration.',
                'Páginas web para una startup, cubriendo todo el ciclo de front-end: maquetación, diseño responsive e integración de funcionalidades.',
                'Pages web pour une startup, couvrant tout le cycle front-end : intégration, design responsive et ajout de fonctionnalités.',
                'Páginas web para uma startup, cobrindo todo o ciclo de front-end: layout, design responsivo e integração de funcionalidades.',
                'Webseiten für ein Startup über den gesamten Frontend-Zyklus: Layout, Responsive Design und Integration von Funktionen.',
                'スタートアップ向けのWebページ制作。レイアウト、レスポンシブデザイン、機能の組み込みまでフロントエンド全般を担当。'
              )],
              tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
            },
          },
        ],
      },

      /* ───────────────────────── EDUCATION ───────────────────────── */
      {
        id: 'education',
        label: L('Education', 'Formación', 'Formation', 'Formação', 'Ausbildung', '学歴'),
        icon: 'cap',
        items: [
          {
            title: 'DevOps & Cloud',
            subtitle: L('UNIR · May 2026', 'UNIR · may 2026', 'UNIR · mai 2026', 'UNIR · mai 2026', 'UNIR · Mai 2026', 'UNIR・2026年5月'),
            icon: 'cloud',
            panel: {
              title: L('Advanced Programme in DevOps & Cloud', 'Programa Avanzado en DevOps & Cloud', 'Programme avancé DevOps & Cloud', 'Programa Avançado em DevOps & Cloud', 'Fortgeschrittenenprogramm DevOps & Cloud', 'DevOps & クラウド上級プログラム'),
              subtitle: L('UNIR — Universidad Internacional de La Rioja · May 2026', 'UNIR — Universidad Internacional de La Rioja · may 2026', 'UNIR — Universidad Internacional de La Rioja · mai 2026', 'UNIR — Universidad Internacional de La Rioja · mai 2026', 'UNIR — Universidad Internacional de La Rioja · Mai 2026', 'UNIR（ラ・リオハ国際大学）・2026年5月'),
              body: [L(
                'Hands-on programme focused on CI/CD, cloud and infrastructure as code.',
                'Programa práctico centrado en CI/CD, cloud e infraestructura como código.',
                'Programme pratique axé sur le CI/CD, le cloud et l’infrastructure as code.',
                'Programa prático focado em CI/CD, cloud e infraestrutura como código.',
                'Praxisorientiertes Programm mit Fokus auf CI/CD, Cloud und Infrastructure as Code.',
                'CI/CD、クラウド、Infrastructure as Codeを中心とした実践的なプログラム。'
              )],
              tags: ['CI/CD', 'Jenkins', 'Docker', 'Terraform', 'Ansible', 'Kubernetes', 'Azure', 'AWS'],
            },
          },
          {
            title: L('Certifications', 'Certificaciones', 'Certifications', 'Certificações', 'Zertifikate', '資格'),
            subtitle: 'AZ-900 · AWS · Cambridge FCE',
            icon: 'award',
            panel: {
              title: L('Certifications', 'Certificaciones', 'Certifications', 'Certificações', 'Zertifikate', '資格'),
              timeline: [
                { date: L('May 2026', 'may 2026', 'mai 2026', 'mai 2026', 'Mai 2026', '2026年5月'), title: 'Microsoft Certified: Azure Fundamentals (AZ-900)', place: 'Microsoft' },
                { date: L('Jun 2026 (expected)', 'jun 2026 (previsto)', 'juin 2026 (prévu)', 'jun 2026 (previsto)', 'Juni 2026 (geplant)', '2026年6月（予定）'), title: 'AWS Certified Cloud Practitioner', place: 'Amazon Web Services' },
                { date: L('Feb 2021', 'feb 2021', 'févr. 2021', 'fev 2021', 'Feb. 2021', '2021年2月'), title: L('Cambridge English: First (FCE) — B2', 'Cambridge English: First (FCE) — Nivel B2', 'Cambridge English: First (FCE) — Niveau B2', 'Cambridge English: First (FCE) — Nível B2', 'Cambridge English: First (FCE) — Niveau B2', 'Cambridge English: First (FCE) — B2レベル'), place: 'Cambridge Assessment' },
              ],
            },
          },
          {
            title: L('Multiplatform App Development (DAM)', 'Desarrollo de Aplicaciones Multiplataforma (DAM)', 'Développement d’applications multiplateformes (DAM)', 'Desenvolvimento de Aplicações Multiplataforma (DAM)', 'Plattformübergreifende App-Entwicklung (DAM)', 'マルチプラットフォームアプリ開発（DAM）'),
            subtitle: L('CENEC Málaga · May 2024', 'CENEC Málaga · may 2024', 'CENEC Málaga · mai 2024', 'CENEC Málaga · mai 2024', 'CENEC Málaga · Mai 2024', 'CENEC Málaga・2024年5月'),
            icon: 'cap',
            panel: {
              title: L('Higher Diploma in Multiplatform App Development (DAM)', 'Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)', 'BTS Développement d’applications multiplateformes (DAM)', 'Técnico Superior em Desenvolvimento de Aplicações Multiplataforma (DAM)', 'Höhere Berufsausbildung: Plattformübergreifende App-Entwicklung (DAM)', 'マルチプラットフォームアプリ開発 上級職業課程（DAM）'),
              subtitle: L('CENEC Málaga · May 2024', 'CENEC Málaga · may 2024', 'CENEC Málaga · mai 2024', 'CENEC Málaga · mai 2024', 'CENEC Málaga · Mai 2024', 'CENEC Málaga・2024年5月'),
              body: [L(
                'Final project: FitTimer, an Android app with integrated AI (Gemini API).',
                'Proyecto final: FitTimer, app Android con IA integrada (API de Gemini).',
                'Projet de fin d’études : FitTimer, application Android avec IA intégrée (API Gemini).',
                'Projeto final: FitTimer, app Android com IA integrada (API do Gemini).',
                'Abschlussprojekt: FitTimer, eine Android-App mit integrierter KI (Gemini-API).',
                '卒業制作：AI（Gemini API）を組み込んだAndroidアプリ「FitTimer」。'
              )],
              tags: ['Kotlin', 'Java', 'Android', 'SQL'],
            },
          },
          {
            title: L('Systems & Networks (SMR)', 'Sistemas Microinformáticos y Redes (SMR)', 'Systèmes et réseaux (SMR)', 'Sistemas Microinformáticos e Redes (SMR)', 'Systeme und Netzwerke (SMR)', 'システムとネットワーク（SMR）'),
            subtitle: L('IES Kursaal · Jun 2022', 'IES Kursaal · jun 2022', 'IES Kursaal · juin 2022', 'IES Kursaal · jun 2022', 'IES Kursaal · Juni 2022', 'IES Kursaal・2022年6月'),
            icon: 'chip',
            panel: {
              title: L('Intermediate Diploma in Microcomputer Systems & Networks (SMR)', 'Grado Medio en Sistemas Microinformáticos y Redes (SMR)', 'CAP Systèmes micro-informatiques et réseaux (SMR)', 'Técnico em Sistemas Microinformáticos e Redes (SMR)', 'Berufsausbildung Mikrocomputersysteme und Netzwerke (SMR)', 'マイクロコンピュータシステム・ネットワーク 中級職業課程（SMR）'),
              subtitle: L('IES Kursaal · Jun 2022', 'IES Kursaal · jun 2022', 'IES Kursaal · juin 2022', 'IES Kursaal · jun 2022', 'IES Kursaal · Juni 2022', 'IES Kursaal・2022年6月'),
              tags: ['Hardware', NETWORKING, 'Windows', 'Linux'],
            },
          },
        ],
      },

      /* ───────────────────────── CONTACT ───────────────────────── */
      {
        id: 'contact',
        label: L('Contact', 'Contacto', 'Contact', 'Contato', 'Kontakt', '連絡先'),
        icon: 'mail',
        items: [
          {
            title: L('Email', 'Email', 'E-mail', 'E-mail', 'E-Mail', 'メール'), subtitle: 'sergioglezz04@gmail.com', icon: 'mail',
            panel: {
              title: L('Email', 'Email', 'E-mail', 'E-mail', 'E-Mail', 'メール'),
              body: [L(
                'Got a project in mind or an offer? Write to me.',
                '¿Tienes un proyecto en mente o una oferta? Escríbeme.',
                'Un projet en tête ou une offre ? Écris-moi.',
                'Tem um projeto em mente ou uma proposta? Me escreva.',
                'Du hast ein Projekt oder ein Angebot? Schreib mir.',
                'プロジェクトのご相談やオファーはお気軽にご連絡ください。'
              )],
              links: [{ label: 'sergioglezz04@gmail.com', url: 'mailto:sergioglezz04@gmail.com', icon: 'mail' }],
            },
          },
          {
            title: 'LinkedIn', subtitle: '/in/sergio-gonzalez-castilla', icon: 'card',
            panel: {
              title: 'LinkedIn',
              body: [L('My professional profile.', 'Mi perfil profesional.', 'Mon profil professionnel.', 'Meu perfil profissional.', 'Mein berufliches Profil.', '職務プロフィール。')],
              links: [{ label: L('Open LinkedIn', 'Abrir LinkedIn', 'Ouvrir LinkedIn', 'Abrir LinkedIn', 'LinkedIn öffnen', 'LinkedInを開く'), url: 'https://www.linkedin.com/in/sergio-gonzalez-castilla/', icon: 'card' }],
            },
          },
          {
            title: 'GitHub', subtitle: 'github.com/sergioglezz', icon: 'branch',
            panel: {
              title: 'GitHub',
              body: [L('My code and projects.', 'Mi código y proyectos.', 'Mon code et mes projets.', 'Meu código e projetos.', 'Mein Code und meine Projekte.', 'コードとプロジェクト。')],
              links: [{ label: L('Open GitHub', 'Abrir GitHub', 'Ouvrir GitHub', 'Abrir GitHub', 'GitHub öffnen', 'GitHubを開く'), url: GH, icon: 'branch' }],
            },
          },
          {
            title: L('Location', 'Ubicación', 'Localisation', 'Localização', 'Standort', '所在地'),
            subtitle: L('Algeciras, Spain', 'Algeciras, España', 'Algésiras, Espagne', 'Algeciras, Espanha', 'Algeciras, Spanien', 'スペイン・アルヘシラス'),
            icon: 'location',
            panel: {
              title: L('Location', 'Ubicación', 'Localisation', 'Localização', 'Standort', '所在地'),
              body: [L(
                'Based in Algeciras (Cádiz, Spain). Open to remote and on-site work.',
                'Vivo en Algeciras (Cádiz, España). Abierto a trabajo remoto y presencial.',
                'Basé à Algésiras (Cadix, Espagne). Ouvert au télétravail et au présentiel.',
                'Moro em Algeciras (Cádiz, Espanha). Aberto a trabalho remoto e presencial.',
                'Wohnhaft in Algeciras (Cádiz, Spanien). Offen für Remote- und Vor-Ort-Arbeit.',
                'スペイン・カディス県アルヘシラス在住。リモート・出社どちらも可能です。'
              )],
            },
          },
          {
            title: L('CV', 'Currículum', 'CV', 'Currículo', 'Lebenslauf', '履歴書'),
            subtitle: L('Download CV as PDF', 'Descargar CV en PDF', 'Télécharger le CV en PDF', 'Baixar CV em PDF', 'Lebenslauf als PDF', 'PDFでダウンロード'),
            icon: 'file',
            panel: {
              title: L('CV', 'Currículum', 'CV', 'Currículo', 'Lebenslauf', '履歴書'),
              pdf: 'assets/cv.pdf',   // visor integrado en el panel
              links: [
                { label: L('Download CV', 'Descargar CV', 'Télécharger le CV', 'Baixar CV', 'Lebenslauf herunterladen', '履歴書をダウンロード'), url: 'assets/cv.pdf', icon: 'file', download: 'Sergio_Gonzalez_CV.pdf' },
                { label: L('Open in a new tab', 'Abrir en otra pestaña', 'Ouvrir dans un nouvel onglet', 'Abrir em nova aba', 'In neuem Tab öffnen', '新しいタブで開く'), url: 'assets/cv.pdf', icon: 'globe', newTab: true },
              ],
            },
          },
        ],
      },
    ],
  };
})();
