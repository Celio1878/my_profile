import { FC } from "react";
import Image from "next/image";
import { GithubLink } from "@/components/links/githubLink";
import { HighlightedContent } from "@/components/highlightedContent";
import { LinkedinLink } from "@/components/links/linkedinLink";
import Link from "next/link";
import { NpmPackagesLink } from "@/components/links/npmPackagesLink";

export const MainPage: FC = () => {
  const get_years_of_experience = () => {
    const init_career_year = 2020;
    const current_year = new Date().getFullYear();
    return current_year - init_career_year;
  };
  const years_of_experience = get_years_of_experience();

  const aws_services_logos = [
    <Image
      key="api-gateway"
      src="/api-gateway.svg"
      alt="API-GATEWAY"
      width={30}
      height={30}
    />,

    <Image
      key="cloudformation"
      src="/cloudformation.svg"
      alt="Cloud Formation"
      width={30}
      height={30}
    />,
    <Image
      key="cloudfront"
      src="/cloudfront.svg"
      alt="CloudFront"
      width={30}
      height={30}
    />,
    <Image
      key="cloudwatch"
      src="/cloudwatch.svg"
      alt="CloudWatch"
      width={30}
      height={30}
    />,
    <Image
      key="codedeploy"
      src="/codedeploy.svg"
      alt="Code Deploy"
      width={30}
      height={30}
    />,
    <Image
      key="cognito"
      src="/cognito.svg"
      alt="Cognito"
      width={30}
      height={30}
    />,
    <Image
      key="dynamodb"
      src="/dynamodb.svg"
      alt="DynamoDB"
      width={30}
      height={30}
    />,
    <Image key="ec2" src="/ec2.svg" alt="EC2" width={30} height={30} />,
    <Image key="iam" src="/iam.svg" alt="IAM" width={30} height={30} />,
    <Image
      key="kinesis"
      src="/kinesis.svg"
      alt="Kinesis"
      width={30}
      height={30}
    />,
    <Image
      key="lambda"
      src="/lambda.svg"
      alt="Lambda"
      width={30}
      height={30}
    />,
    <Image key="rds" src="/rds.svg" alt="RDS" width={30} height={30} />,
    <Image
      key="route53"
      src="/route53.svg"
      alt="Route 53"
      width={30}
      height={30}
    />,
    <Image key="s3" src="/s3.svg" alt="S3" width={30} height={30} />,
    <Image key="sns" src="/sns.svg" alt="SNS" width={30} height={30} />,
    <Image key="sqs" src="/sqs.svg" alt="SQS" width={30} height={30} />,
    <Image key="vpc" src="/vpc.svg" alt="VPC" width={30} height={30} />,
  ];

  return (
    <section className="w-full h-full flex flex-col items-center justify-center text-black dark:text-gray-50 text-center">
      <h1 className="text-4xl font-bold">Hello, my name is Célio!</h1>
      <Image
        src="https://avatars.githubusercontent.com/u/40040827?&v=4"
        className="rounded-full"
        alt="Célio"
        width="150"
        height="150"
      />
      <p className="flex flex-col text-center justify-center items-center">
        I am a software engineer specializing in Cloud Computing and I&apos;ve
        worked for the last {years_of_experience} years with it.
        <LinkedinLink className="text-gray-800 dark:text-gray-100 hover:text-white">
          <HighlightedContent>
            <span className="py-1 px-2 border border-sky-100 dark:border-sky-800 rounded-md hover:bg-sky-400 transition delay-75">
              Check my curriculum!
            </span>
          </HighlightedContent>
        </LinkedinLink>
      </p>

      <h3>
        I have a full experience using programming languages such as
        <div className="flex flex-row justify-around items-center my-4">
          <Image src="/javascript.svg" alt="JS" width={30} height={30} />
          <Image src="/typescript.svg" alt="JS" width={30} height={30} />
          <Image src="/python.svg" alt="JS" width={30} height={30} />
          <Image src="/golang.svg" alt="JS" width={30} height={30} />
        </div>
      </h3>
      <h4 className="flex flex-row text-sm items-center">
        and knowing a little about
        <Image
          className="mx-2"
          src="/csharp.svg"
          alt="JS"
          width={20}
          height={30}
        />
        and
        <Image
          className="mx-2"
          src="/c.svg"
          alt="JS"
          width={20}
          height={30}
        />{" "}
        as well, I&apos;ve developed some features using it
      </h4>
      <h1 className="my-4">
        <GithubLink
          className="text-gray-800 dark:text-gray-100 hover:text-white"
          complement="tab=repositories"
        >
          <HighlightedContent>
            <span className="py-1 px-2 border border-sky-100 dark:border-sky-800 rounded-md hover:bg-sky-400 transition delay-75 ml-2">
              check out my github repositories
            </span>
          </HighlightedContent>
        </GithubLink>
      </h1>
      <section>Some technologies I&apos;m using in my projects</section>
      <div className="flex flex-wrap w-2/5 gap-8 justify-center items-center my-6">
        <Image src="/aws.svg" alt="AWS" width={30} height={30} />
        <Image src="/docker.svg" alt="Docker" width={30} height={30} />
        <Image src="/git.svg" alt="JS" width={30} height={30} />
        <Image src="/github-icon.svg" alt="GITHUB" width={30} height={30} />
        <Image src="/kafka.svg" alt="KAFKA" width={30} height={30} />
        <Image
          src="/elasticsearch.svg"
          alt="ELASTICSEARCH"
          width={30}
          height={30}
        />
        <Image src="/terraform.svg" alt="TERRAFORM" width={30} height={30} />
        <Image src="/vercel.svg" alt="VERCEL" width={30} height={30} />
        <Image src="/sql-server.svg" alt="SQL" width={30} height={30} />
        <Image src="/firebase.svg" alt="FIREBASE" width={30} height={30} />
        <Image src="/nodejs.svg" alt="NODEJS" width={30} height={30} />
        <Image src="/fastapi.svg" alt="FASTAPI" width={30} height={30} />
        <Image src="/nextjs.svg" alt="NEXTJS" width={30} height={30} />
        <Image src="/react.svg" alt="REACTJS" width={30} height={30} />
      </div>

      <div>
        <p>
          Building different kind of software, I realised that it&apos;s
          possible to create packages (libs) that turn easy the creation of any
          other systems.
        </p>
        <ul className="flex flex-col md:flex-row items-center justify-around">
          <li className="w-1/3 flex flex-col items-center justify-center text-center">
            <NpmPackagesLink
              className="border border-2 border-emerald-500 p-6 rounded-md hover:bg-emerald-500 hover:text-white transition delay-75"
              complement="package/nodejs-appbuilder"
            >
              NodeJS App Builder
            </NpmPackagesLink>
            <p>
              It&apos;s possible to create a NodeJS App with a Serverless
              handler, and with this, you can focus on routes, middlewares and
              business rules.
            </p>
          </li>
          <li className="w-1/3 flex flex-col items-center justify-center text-center">
            <NpmPackagesLink
              className="border border-2 border-emerald-500 p-6 rounded-md hover:bg-emerald-500 hover:text-white transition delay-75"
              complement="package/cdk-factory"
            >
              CDK Factory
            </NpmPackagesLink>
            <p>
              CDK Factory may be used with
              <Link
                className="underline mx-1.5 hover:opacity-50 transition delay-75"
                href="https://aws.amazon.com/pt/cdk/"
              >
                AWS CDK
              </Link>
              and it helps you to create new instances for your Lambda, Api
              Gateway, DynamoDB and many other resources.
            </p>
          </li>
        </ul>

        <h1>
          And I&apos;m using ones in a side hustle I&apos;m working called
          <Link
            className="text-lg font-semibold border border-slate-400 p-2 mx-2 rounded hover:bg-purple-600 hover:border-slate-50 hover:text-white transition delay-75"
            href="https://beyourstories.com/"
            key="bys"
            id="bys"
            target="_blank"
          >
            Be Your Stories
          </Link>
          completely serverless.
        </h1>

        <div className="w-full flex flex-col items-center justify-center">
          <p>
            Additionally, I have gotten some courses/certifications about great
            technologies
          </p>

          <LinkedinLink
            className="text-gray-800 dark:text-gray-100 hover:text-white"
            complement="details/certifications/"
          >
            <HighlightedContent>
              <span className="py-1 px-2 border border-sky-100 dark:border-sky-800 rounded-md hover:bg-sky-400 transition delay-75">
                Check my Certifications!
              </span>
            </HighlightedContent>
          </LinkedinLink>
        </div>

        <div>
          <h3>
            Currently, I&apos;m working as a Software Engineer at
            <Link
              href="https://www.itau.com.br"
              className="underline mx-2 hover:text-orange-500 trasition delay-75"
            >
              Itaú Unibanco
            </Link>
            in Payment systems, managing and building new features
          </h3>
          <h2>Using mainly the AWS services like</h2>
        </div>
      </div>
      <div className="relative rounded-lg m-auto w-full md:w-9/12 overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] after:content-['']">
        <div className="animate-infinite-slider flex w-[calc(250px*10)]">
          {aws_services_logos.map((logo) => (
            <div
              className="slide flex w-[125px] items-center justify-center"
              key={logo.key}
            >
              {logo}
            </div>
          ))}
          {aws_services_logos.map((logo) => (
            <div
              className="slide flex w-[125px] items-center justify-center"
              key={logo.key}
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
      <h1>
        But I&apos;ve already worked as Senior Software Developer at
        <Link
          className="mx-2 underline hover:opacity-85"
          href="https://www.squadra.com.br/index.html"
        >
          Squadra Digital
        </Link>
        and FullStack Developer at
        <Link
          className="mx-2 underline hover:opacity-85"
          href="https://editoraforum.com.br/"
        >
          Editora Fórum
        </Link>
        using many services like
      </h1>

      <div className="flex flex-wrap w-2/5 gap-8 justify-center items-center my-6">
        <Image src="/amplify.svg" alt="AMPLIFY" width={30} height={30} />
        <Image src="/cdk.svg" alt="CDK" width={30} height={30} />
        <Image src="/codebuild.svg" alt="CodeBuild" width={30} height={30} />
        <Image
          src="/codepipeline.svg"
          alt="CodePipeline"
          width={30}
          height={30}
        />
        <Image
          src="/costexplorer.svg"
          alt="CostExplorer"
          width={30}
          height={30}
        />
        <Image
          src="/elasticache.svg"
          alt="ELASTICACHE"
          width={30}
          height={30}
        />
        <Image
          src="/elasticcontainer.svg"
          alt="Container"
          width={30}
          height={30}
        />
        <Image
          src="/eventbridge.svg"
          alt="Event Bridge"
          width={30}
          height={30}
        />
        <Image src="/kms.svg" alt="KMS" width={30} height={30} />
        <Image src="/opensearch.svg" alt="OpenSearch" width={30} height={30} />
        <Image
          src="/secretsmanager.svg"
          alt="Secrets Manager"
          width={30}
          height={30}
        />
        <Image
          src="/stepfunctions.svg"
          alt="Step Functions"
          width={30}
          height={30}
        />
        <Image
          src="/systemsmanager.svg"
          alt="Systems Manager"
          width={30}
          height={30}
        />
        <Image
          src="/trustedadvisor.svg"
          alt="Trusted Advisor"
          width={30}
          height={30}
        />
        <Image
          src="/wellarchitectedtool.svg"
          alt="Well Architected Tool"
          width={30}
          height={30}
        />
        <Image src="/kafka.svg" alt="KAFKA" width={30} height={30} />
        <Image
          src="/elasticsearch.svg"
          alt="ELASTICSEARCH"
          width={30}
          height={30}
        />
        <Image src="/vercel.svg" alt="VERCEL" width={30} height={30} />
        <Image src="/nodejs.svg" alt="NODEJS" width={30} height={30} />
        <Image src="/fastapi.svg" alt="FASTAPI" width={30} height={30} />
        <Image src="/nextjs.svg" alt="NEXTJS" width={30} height={30} />
        <Image src="/react.svg" alt="REACTJS" width={30} height={30} />
      </div>
    </section>
  );
};
