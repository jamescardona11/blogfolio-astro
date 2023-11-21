import { graphql } from '@octokit/graphql'

import { GITHUB_TOKEN } from '@/lib/data/remote/remote-constants'
import { siteMetadata } from '@/site-metadata'
import {
  createFailureResponse,
  createSuccessResponse
} from '@/lib/core/api_response'
import type { GithubStatsType } from '@/lib/types/github-stats.type'

export async function getGithubStatsData() {
  console.log('GET /api/dashboard/wakatime')

  if (GITHUB_TOKEN == null) {
    createFailureResponse('API key is missing', 'UNKNOWN')
  }

  try {
    // @ts-ignore
    const { user } = await graphql(GRAPHQL_STATS_QUERY, {
      login: siteMetadata.github,
      headers: {
        authorization: `bearer ${GITHUB_TOKEN}`
      }
    })

    const stars = user.repositories.nodes.reduce(
      (accumulator: number, repo: { stargazers: { totalCount: number } }) => {
        return accumulator + repo.stargazers.totalCount
      },
      0
    )

    const followers = user.followers.totalCount
    const contributions =
      user.contributionsCollection.contributionCalendar.totalContributions

    return createSuccessResponse({
      followers,
      stars,
      contributions
    } as GithubStatsType)
  } catch (error) {
    console.error(error)
    return createFailureResponse('Something went wrong with Github', 'UNKNOWN')
  }
}

const GRAPHQL_REPOS_FIELD = `
  repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
    totalCount
    nodes {
      name
      stargazers {
        totalCount
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
`

const GRAPHQL_STATS_QUERY = `
      query userInfo($login: String!) {
        user(login: $login) {
          contributionsCollection {
            totalCommitContributions,
            totalPullRequestReviewContributions
            contributionCalendar {
              totalContributions
            }
          }
          followers {
            totalCount
          }
          ${GRAPHQL_REPOS_FIELD}
        }
      }
    `
